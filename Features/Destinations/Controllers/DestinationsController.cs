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
        private readonly IConnectedUserRepository connectedUserRepo;
        private readonly ILogger<DestinationsController> logger;
        private readonly IHubContext<NotificationHub> notificationHubContext;

        public DestinationsController(IDestinationRepository repo, IConnectedUserRepository connectedUserRepo, ILogger<DestinationsController> logger, IHubContext<NotificationHub> notificationHubContext) {
            this.repo = repo;
            this.connectedUserRepo = connectedUserRepo;
            this.logger = logger;
            this.notificationHubContext = notificationHubContext;
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
                    notificationHubContext.Clients.All.SendAsync("send", "Record added");
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
        public async Task<IActionResult> PutDestinationAsync([FromRoute] int id, [FromBody] Destination record) {
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    await notificationHubContext.Clients.All.SendAsync("Send", await GetConnectedUsers()); // Call the 'Send' method in the signalr service
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

        private async Task<IEnumerable<ConnectedUser>> GetConnectedUsers() {
            return await connectedUserRepo.Get();
        }

    }

}