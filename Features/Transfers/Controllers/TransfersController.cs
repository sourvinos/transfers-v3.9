using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Authorize(Roles = "User, Admin")]
    [Route("api/[controller]")]

    public class TransfersController : ControllerBase {

        private readonly IMapper mapper;
        private readonly ITransferRepository repo;

        public TransfersController(ITransferRepository repo, IMapper mapper) =>
            (this.repo, this.mapper) = (repo, mapper);

        [HttpGet("date/{dateIn}")]
        public TransferGroupResultResource<TransferResource> Get(string dateIn) =>
            this.repo.Get(dateIn);

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransfer(int id) {
            var transfer = await repo.GetById(id);
            if (transfer == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            return StatusCode(200, transfer);
        }

        [HttpPost]
        public IActionResult PostTransfer([FromBody] SaveTransferResource record) {
            if (ModelState.IsValid) {
                try {
                    repo.Create(mapper.Map<SaveTransferResource, Transfer>(record));
                    return StatusCode(200, new { response = ApiMessages.RecordCreated() });
                } catch (DbUpdateException exception) {
                    return StatusCode(490, new { response = Extensions.DBUpdateException(MethodBase.GetCurrentMethod(), record, exception) });
                }
            }
            return StatusCode(400, new { response = Extensions.NotValidModel(MethodBase.GetCurrentMethod(), record, ModelState) });
        }

        [HttpPut("{id}")]
        public IActionResult PutTransfer([FromRoute] int id, [FromBody] SaveTransferResource record) {
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
                } catch (DbUpdateException exception) {
                    return StatusCode(490, new { response = Extensions.DBUpdateException(MethodBase.GetCurrentMethod(), record, exception) });
                }
            }
            return StatusCode(400, new { response = Extensions.NotValidModel(MethodBase.GetCurrentMethod(), record, ModelState) });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer([FromRoute] int id) {
            var record = await repo.GetByIdToDelete(id);
            if (record == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            try {
                repo.Delete(record);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return StatusCode(491, new { response = ApiMessages.RecordInUse() });
            }
        }

        [HttpPatch("assignDriver")]
        public IActionResult AssignDriver(int driverId, [FromQuery(Name = "id")] int[] ids) {
            repo.AssignDriver(driverId, ids);
            return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
        }

    }

}