using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    [Authorize]
    [Route("api/[controller]")]

    public class AlertsController : ControllerBase {

        private readonly IAlertRepository repo;

        public AlertsController(IAlertRepository repo) {
            this.repo = repo;
        }

        [HttpGet("[action]/{userId}")]
        public async Task<IActionResult> GetForUser([FromRoute] string userId) {
            return StatusCode(200, await repo.GetForUser(userId));
        }

    }

}