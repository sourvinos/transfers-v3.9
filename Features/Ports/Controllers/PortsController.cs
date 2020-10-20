﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            Port Port = await repo.GetById(id);
            if (Port == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            return Ok(Port);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostPort([FromBody] Port Port) {
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            repo.Create(Port);
            return Ok(new { response = ApiMessages.RecordCreated() });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutPort([FromRoute] int id, [FromBody] Port Port) {
            if (id != Port.Id) return BadRequest(new { response = messageService.GetMessage("InvalidId") });
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(Port);
            } catch (System.Exception) {
                return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            }
            return Ok(new { response = ApiMessages.RecordUpdated() });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePort([FromRoute] int id) {
            Port Port = await repo.GetById(id);
            if (Port == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(Port);
                return Ok(new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return BadRequest(new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}