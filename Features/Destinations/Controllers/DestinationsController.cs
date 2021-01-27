using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Transfers {

    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]

    public class DestinationsController : ControllerBase {

        private readonly IDestinationRepository repo;
        private readonly ILogger<DestinationsController> logger;
        private readonly IHubContext<MessageHub> messageHubContext;

        public DestinationsController(IDestinationRepository repo, ILogger<DestinationsController> logger, IHubContext<MessageHub> messageHubContext) {
            this.repo = repo;
            this.logger = logger;
            this.messageHubContext = messageHubContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Destination>> Get() {
            return await repo.Get();
        }

        [HttpGet("[action]")]
        public int GetCount() {
            return repo.GetCount();
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Destination>> GetActive() {
            return await repo.GetActive(x => x.IsActive);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDestination(int id) {
            Destination record = await repo.GetById(id);
            if (record == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            return StatusCode(200, record);
        }

        [HttpPost]
        public IActionResult PostDestination([FromBody] Destination record) {
            if (ModelState.IsValid) {
                try {
                    repo.Create(record);
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
        public IActionResult PutDestination([FromRoute] int id, [FromBody] Destination record) {
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    messageHubContext.Clients.All.SendAsync("send", repo.GetCount());
                    return StatusCode(200, new {
                        // response = ApiMessages.RecordUpdated()
                        response = repo.GetCount()
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
        public async Task<IActionResult> DeleteDestination([FromRoute] int id) {
            Destination record = await repo.GetById(id);
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

    }

}