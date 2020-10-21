using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize]

    public class PickupPointsController : ControllerBase {

        private readonly IPickupPointRepository repo;
        private readonly MessageService messageService;

        public PickupPointsController(IPickupPointRepository repo, MessageService messageService) =>
            (this.repo, this.messageService) = (repo, messageService);

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
            if (pickupPoint == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            return StatusCode(200, pickupPoint);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostPickupPoint([FromBody] PickupPoint pickupPoint) {
            if (!ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Create(pickupPoint);
                return StatusCode(200, new { response = ApiMessages.RecordCreated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutPickupPoint([FromRoute] int id, [FromBody] PickupPoint pickupPoint) {
            if (id != pickupPoint.Id || !ModelState.IsValid) return StatusCode(490, new { response = messageService.GetMessage("InvalidId") });
            try {
                repo.Update(pickupPoint);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePickupPoint([FromRoute] int id) {
            PickupPoint pickupPoint = await repo.GetById(id);
            if (pickupPoint == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(pickupPoint);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (Exception) {
                return StatusCode(491, new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}