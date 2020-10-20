using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            Destination Destination = await repo.GetById(id);
            if (Destination == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            return Ok(Destination);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostDestination([FromBody] Destination Destination) {
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            repo.Create(Destination);
            return Ok(new { response = ApiMessages.RecordCreated() });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutDestination([FromRoute] int id, [FromBody] Destination Destination) {
            if (id != Destination.Id) return BadRequest(new { response = messageService.GetMessage("InvalidId") });
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(Destination);
            } catch (System.Exception) {
                return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            }
            return Ok(new { response = ApiMessages.RecordUpdated() });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDestination([FromRoute] int id) {
            Destination destination = await repo.GetById(id);
            if (destination == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(destination);
                return Ok(new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return BadRequest(new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}