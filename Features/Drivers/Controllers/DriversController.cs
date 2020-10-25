using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Authorize]
    [Route("api/[controller]")]

    public class DriversController : ControllerBase {

        private readonly IDriverRepository repo;

        public DriversController(IDriverRepository repo) =>
            (this.repo) = (repo);

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Driver>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<Driver>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("defaultDriver")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> GetDefaultDriver() {
            Driver driver = await repo.GetDefaultDriver();
            if (driver == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            return StatusCode(200, driver);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDriver(int id) {
            Driver driver = await repo.GetById(id);
            if (driver == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            return StatusCode(200, driver);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostDriver([FromBody] Driver record) {
            if (await repo.CheckDefaultDriverExists(null, record) != null) {
                return StatusCode(409, new { response = ApiMessages.DefaultDriverAlreadyExists() });
            };
            if (ModelState.IsValid) {
                try {
                    repo.Create(record);
                    return StatusCode(200, new { response = ApiMessages.RecordCreated() });
                } catch (DbUpdateException exception) {
                    return StatusCode(490, new { response = Extensions.DBUpdateException(MethodBase.GetCurrentMethod(), record, exception) });
                }
            }
            return StatusCode(400, new { response = Extensions.NotValidModel(MethodBase.GetCurrentMethod(), record, ModelState) });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutDriver([FromRoute] int id, [FromBody] Driver record) {
            if (await repo.CheckDefaultDriverExists(id, record) != null) {
                return StatusCode(409, new { response = ApiMessages.DefaultDriverAlreadyExists() });
            };
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
                } catch (DbUpdateException exception) {
                    return StatusCode(490, new { response = Extensions.DBUpdateException(MethodBase.GetCurrentMethod(), record, exception) });
                }
            }
            return StatusCode(400, new { response = Extensions.NotValidModel(MethodBase.GetCurrentMethod(), record, ModelState) });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDriver([FromRoute] int id) {
            Driver record = await repo.GetById(id);
            if (record == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            try {
                repo.Delete(record);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return StatusCode(491, new { response = ApiMessages.RecordInUse() });
            }
        }

    }

}