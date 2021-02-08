using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Transfers {

    [Authorize]
    [Route("api/[controller]")]

    public class NotificationsController : ControllerBase {

        private readonly INotificationRepository repo;
        private readonly ILogger<DestinationsController> logger;
        private readonly IHubContext<NotificationHub> messageHubContext;

        public NotificationsController(INotificationRepository notificationRepository, ILogger<DestinationsController> logger, IHubContext<NotificationHub> messageHubContext) {
            this.repo = notificationRepository;
            this.logger = logger;
            this.messageHubContext = messageHubContext;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(string userId) {
            Notification record = await repo.Get(userId);
            if (record == null) {
                LoggerExtensions.LogException(userId, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            return StatusCode(200, record);
        }

    }

}