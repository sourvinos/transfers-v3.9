using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Authorize]
    [Route("api/[controller]")]

    public class PickupPointsController : ControllerBase {

        private readonly IPickupPointRepository repo;

        public PickupPointsController(IPickupPointRepository repo) =>
            (this.repo) = (repo);

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<PickupPoint>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<PickupPoint>> GetActive() =>
            await repo.GetActive();

        [HttpGet("routeId/{routeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<PickupPoint>> Get(int routeId) =>
            await repo.GetForRoute(routeId);

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPickupPoint(int id) {
            PickupPoint pickupPoint = await repo.GetById(id);
            if (pickupPoint == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            return StatusCode(200, pickupPoint);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostPickupPoint([FromBody] PickupPoint record) {
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
        public IActionResult PutPickupPoint([FromRoute] int id, [FromBody] PickupPoint record) {
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
        public async Task<IActionResult> DeletePickupPoint([FromRoute] int id) {
            PickupPoint record = await repo.GetById(id);
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