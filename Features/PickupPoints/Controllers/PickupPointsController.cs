using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IEnumerable<PickupPoint>> Get() {
            return await repo.Get();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<PickupPoint>> GetActive() {
            return await repo.GetActive();
        }

        [HttpGet("routeId/{routeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<PickupPoint>> Get(int routeId) {
            return await repo.GetForRoute(routeId);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPickupPoint(int id) {
            PickupPoint pickupPoint = await repo.GetById(id);
            if (pickupPoint == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            return Ok(pickupPoint);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostPickupPoint([FromBody] PickupPoint pickupPoint) {
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            repo.Create(pickupPoint);
            return Ok(new { response = ApiMessages.RecordCreated() });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutPickupPoint([FromRoute] int id, [FromBody] PickupPoint pickupPoint) {
            if (id != pickupPoint.Id) return BadRequest(new { response = messageService.GetMessage("InvalidId") });
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(pickupPoint);
            } catch (System.Exception) {
                return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            }
            return Ok(new { response = ApiMessages.RecordUpdated() });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePickupPoint([FromRoute] int id) {
            PickupPoint pickupPoint = await repo.GetById(id);
            if (pickupPoint == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(pickupPoint);
                return Ok(new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return BadRequest(new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}