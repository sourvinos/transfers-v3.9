using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize]

    public class DestinationsController : ControllerBase {

        private readonly IDestinationRepository repo;
        private readonly MessageService messageService;

        public DestinationsController(IDestinationRepository repo, MessageService messageService) =>
            (this.repo, this.messageService) = (repo, messageService);

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Destination>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<Destination>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDestination(int id) {
            Destination destination = await repo.GetById(id);
            if (destination == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            return StatusCode(200, destination);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostDestination([FromBody] Destination destination) {
            if (!ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Create(destination);
                return StatusCode(200, new { response = ApiMessages.RecordCreated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutDestination([FromRoute] int id, [FromBody] Destination destination) {
            if (id != destination.Id || !ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(destination);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDestination([FromRoute] int id) {
            Destination destination = await repo.GetById(id);
            if (destination == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(destination);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (Exception) {
                return StatusCode(491, new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}