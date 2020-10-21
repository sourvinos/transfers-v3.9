using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize]

    public class PortsController : ControllerBase {

        private readonly IPortRepository repo;
        private readonly MessageService messageService;

        public PortsController(IPortRepository repo, MessageService messageService) =>
            (this.repo, this.messageService) = (repo, messageService);

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Port>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<Port>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPort(int id) {
            Port port = await repo.GetById(id);
            if (port == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            return StatusCode(200, port);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostPort([FromBody] Port port) {
            if (!ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Create(port);
                return StatusCode(200, new { response = ApiMessages.RecordCreated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutPort([FromRoute] int id, [FromBody] Port port) {
            if (id != port.Id || !ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(port);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePort([FromRoute] int id) {
            Port port = await repo.GetById(id);
            if (port == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(port);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (Exception) {
                return StatusCode(491, new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}