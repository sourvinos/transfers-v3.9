using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize]

    public class DriversController : ControllerBase {

        private readonly IDriverRepository repo;
        private readonly MessageService messageService;

        public DriversController(IDriverRepository repo, MessageService messageService) =>
            (this.repo, this.messageService) = (repo, messageService);

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Driver>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<Driver>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDriver(int id) {
            Driver driver = await repo.GetById(id);
            if (driver == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            return Ok(driver);
        }

        [HttpGet("defaultDriver")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> GetDefaultDriver() {
            Driver driver = await repo.GetDefaultDriver();
            if (driver == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            return Ok(driver);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostDriver([FromBody] Driver Driver) {
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            var defaultDriver = await repo.CheckDefaultDriverExists(null, Driver);
            if (defaultDriver != null) { return Conflict(new { response = messageService.GetMessage("DefaultDriverAlreadyExists") }); };
            repo.Create(Driver);
            return Ok(new { response = ApiMessages.RecordCreated() });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutDriver([FromRoute] int id, [FromBody] Driver Driver) {
            if (id != Driver.Id) return  BadRequest(new { response = messageService.GetMessage("InvalidId") });
            var defaultDriver = await repo.CheckDefaultDriverExists(id, Driver);
            if (defaultDriver != null) { return Conflict(new { response = messageService.GetMessage("DefaultDriverAlreadyExists") }); };
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(Driver);
            } catch (System.Exception) {
                return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            }
            return Ok(new { response = ApiMessages.RecordUpdated() });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDriver([FromRoute] int id) {
            Driver Driver = await repo.GetById(id);
            if (Driver == null) return  NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(Driver);
                return Ok(new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return BadRequest(new {response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}