using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Transfers {

    // [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]

    public class TransfersController : ControllerBase {

        private readonly IMapper mapper;
        private readonly ITransferRepository repo;
        private readonly ILogger<TransfersController> logger;

        public TransfersController(ITransferRepository repo, IMapper mapper, ILogger<TransfersController> logger) {
            this.repo = repo;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet("date/{date}")]
        public TransferGroupResultResource<TransferResource> Get(string date) {
            return this.repo.Get(date);
        }

        [HttpGet("[action]/fromDate/{fromDate}/toDate/{toDate}")]
        public TransferOverview GetOverview(string fromDate, string toDate) {
            return this.repo.GetOverview(fromDate, toDate);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransfer(int id) {
            var transfer = await repo.GetById(id);
            if (transfer == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            };
            return StatusCode(200, transfer);
        }

        [HttpPost]
        public IActionResult PostTransfer([FromBody] SaveTransferResource record) {
            if (ModelState.IsValid) {
                try {
                    repo.Create(mapper.Map<SaveTransferResource, Transfer>(record));
                    return StatusCode(200, new {
                        response = ApiMessages.RecordCreated()
                    });
                } catch (Exception exception) {
                    LoggerExtensions.LogException(0, logger, ControllerContext, record, exception);
                    return StatusCode(490, new {
                        response = ApiMessages.RecordNotSaved()
                    });
                }
            }
            LoggerExtensions.LogException(0, logger, ControllerContext, record, null);
            return StatusCode(400, new {
                response = ApiMessages.InvalidModel()
            });
        }

        [HttpPut("{id}")]
        public IActionResult PutTransfer([FromRoute] int id, [FromBody] SaveTransferResource record) {
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    return StatusCode(200, new {
                        response = ApiMessages.RecordUpdated()
                    });
                } catch (DbUpdateException exception) {
                    LoggerExtensions.LogException(0, logger, ControllerContext, record, exception);
                    return StatusCode(490, new {
                        response = ApiMessages.RecordNotSaved()
                    });
                }
            }
            LoggerExtensions.LogException(0, logger, ControllerContext, record, null);
            return StatusCode(400, new {
                response = ApiMessages.InvalidModel()
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer([FromRoute] int id) {
            Transfer record = await repo.GetByIdToDelete(id);
            if (record == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            try {
                repo.Delete(record);
                return StatusCode(200, new {
                    response = ApiMessages.RecordDeleted()
                });
            } catch (DbUpdateException exception) {
                LoggerExtensions.LogException(0, logger, ControllerContext, record, exception);
                return StatusCode(491, new {
                    response = ApiMessages.RecordInUse()
                });
            }
        }

        [HttpPatch("assignDriver")]
        public IActionResult AssignDriver(int driverId, [FromQuery(Name = "id")] int[] ids) {
            try {
                repo.AssignDriver(driverId, ids);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (DbUpdateException exception) {
                LoggerExtensions.LogException(driverId, logger, ControllerContext, null, exception);
                return StatusCode(490, new {
                    response = ApiMessages.RecordNotSaved()
                });
            }
        }

    }

}