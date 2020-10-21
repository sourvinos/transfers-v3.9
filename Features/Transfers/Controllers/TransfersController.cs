using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize(Roles = "User, Admin")]

    public class TransfersController : ControllerBase {

        private readonly IMapper mapper;
        private readonly ITransferRepository repo;
        private readonly MessageService messageService;

        public TransfersController(ITransferRepository repo, IMapper mapper, MessageService messageService) =>
            (this.repo, this.mapper, this.messageService) = (repo, mapper, messageService);

        [HttpGet("date/{dateIn}")]
        public TransferGroupResultResource<TransferResource> Get(string dateIn) =>
            this.repo.Get(dateIn);

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransfer(int id) {
            var transfer = await repo.GetById(id);
            if (transfer == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            return StatusCode(200, transfer);
        }

        [HttpPost]
        public IActionResult PostTransfer([FromBody] SaveTransferResource saveTransferResource) {
            if (!ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                var transfer = mapper.Map<SaveTransferResource, Transfer>(saveTransferResource);
                repo.Create(transfer);
                return StatusCode(200, new { response = ApiMessages.RecordCreated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpPut("{id}")]
        public IActionResult PutTransfer([FromRoute] int id, [FromBody] SaveTransferResource saveTransferResource) {
            if (id != saveTransferResource.Id || !ModelState.IsValid) return StatusCode(500, new { response = messageService.GetMessage("InvalidId") });
            try {
                repo.Update(saveTransferResource);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer([FromRoute] int id) {
            var transfer = await repo.GetByIdToDelete(id);
            if (transfer == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(transfer);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (Exception) {
                return StatusCode(491, new { response = messageService.GetMessage("RecordInUse") });
            }
        }

        [HttpPatch("assignDriver")]
        public IActionResult AssignDriver(int driverId, [FromQuery(Name = "id")] int[] ids) {
            repo.AssignDriver(driverId, ids);
            return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
        }

    }

}