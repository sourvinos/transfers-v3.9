using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
            if (driver == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            return StatusCode(200, driver);
        }

        [HttpGet("defaultDriver")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> GetDefaultDriver() {
            Driver driver = await repo.GetDefaultDriver();
            if (driver == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            return StatusCode(200, driver);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostDriver([FromBody] Driver driver) {
            if (!ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            if (await repo.CheckDefaultDriverExists(null, driver) != null) { return StatusCode(409, new { response = messageService.GetMessage("DefaultDriverAlreadyExists") }); };
            try {
                repo.Create(driver);
                return StatusCode(200, new { response = ApiMessages.RecordCreated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutDriver([FromRoute] int id, [FromBody] Driver driver) {
            if (id != driver.Id || !ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            var defaultDriver = await repo.CheckDefaultDriverExists(id, driver);
            if (defaultDriver != null) { return StatusCode(409, new { response = messageService.GetMessage("DefaultDriverAlreadyExists") }); };
            try {
                repo.Update(driver);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDriver([FromRoute] int id) {
            Driver driver = await repo.GetById(id);
            if (driver == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(driver);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (Exception) {
                return StatusCode(491, new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}