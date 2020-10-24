using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Authorize]
    [Route("api/[controller]")]

    public class RoutesController : ControllerBase {

        private readonly IRouteRepository repo;

        public RoutesController(IRouteRepository repo) =>
            (this.repo) = (repo);

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Route>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<Route>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRoute(int id) {
            Route route = await repo.GetById(id);
            if (route == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            return StatusCode(200, route);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostRoute([FromBody] Route record) {
            if (ModelState.IsValid) {
                try {
                    repo.Create(record);
                    return StatusCode(200, new { response = ApiMessages.RecordCreated() });
                } catch (DbUpdateException exception) {
                    return StatusCode(490, new { response = Extensions.DBUpdateError(MethodBase.GetCurrentMethod(), record, exception) });
                }
            }
            return StatusCode(400, new { response = Extensions.NotValidModel(MethodBase.GetCurrentMethod(), record, ModelState) });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutRoute([FromRoute] int id, [FromBody] Route record) {
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
                } catch (DbUpdateException exception) {
                    return StatusCode(490, new { response = Extensions.DBUpdateError(MethodBase.GetCurrentMethod(), record, exception) });
                }
            }
            return StatusCode(400, new { response = Extensions.NotValidModel(MethodBase.GetCurrentMethod(), record, ModelState) });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoute([FromRoute] int id) {
            Route record = await repo.GetById(id);
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