using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Transfers {

    [Authorize]
    [Route("api/[controller]")]

    public class AnnouncementsController : ControllerBase {

        private readonly IAnnouncementRepository repo;
        private readonly ILogger<DestinationsController> logger;
        private readonly IHubContext<NotificationHub> messageHubContext;

        public AnnouncementsController(IAnnouncementRepository announcementRepository, ILogger<DestinationsController> logger, IHubContext<NotificationHub> messageHubContext) {
            this.repo = announcementRepository;
            this.logger = logger;
            this.messageHubContext = messageHubContext;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(string userId) {
            Announcement record = await repo.Get(userId);
            if (record == null) {
                LoggerExtensions.LogException(userId, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            return StatusCode(200, record);
        }

        [HttpPut("{id}")]
        public IActionResult PutAnnouncement([FromRoute] string id, [FromBody] Announcement record) {
            if (id == record.UserId && ModelState.IsValid) {
                try {
                    repo.Update();
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

    }

}