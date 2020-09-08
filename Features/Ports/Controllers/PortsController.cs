﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize(Policy = "RequireLoggedIn")]
    public class PortsController : ControllerBase {

        private readonly IPortRepository repo;
        private readonly MessageService messageService;

        public PortsController(IPortRepository repo, MessageService messageService) =>
            (this.repo, this.messageService) = (repo, messageService);

        [HttpGet]
        public async Task<IEnumerable<Port>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        public async Task<IEnumerable<Port>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPort(int id) {
            Port Port = await repo.GetById(id);
            if (Port == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound", "en") });
            return Ok(Port);
        }

        [HttpPost]
        public IActionResult PostPort([FromBody] Port Port) {
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            repo.Create(Port);
            return Ok(new { response = ApiMessages.RecordCreated() });
        }

        [HttpPut("{id}")]
        public IActionResult PutPort([FromRoute] int id, [FromBody] Port Port) {
            if (id != Port.Id)  return BadRequest(new { response = messageService.GetMessage("InvalidId", "en") });
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(Port);
            } catch (System.Exception) {
                   return NotFound(new { response = messageService.GetMessage("RecordNotFound", "en") });
            }
            return Ok(new { response = ApiMessages.RecordUpdated() });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePort([FromRoute] int id) {
            Port Port = await repo.GetById(id);
            if (Port == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound", "en") });
            try {
                repo.Delete(Port);
                return Ok(new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return BadRequest(new { response = messageService.GetMessage("RecordInUse", "en") });
            }
        }

    }

}