using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    public class NotificationsController : Controller {

        public IActionResult ActivationError(string userId, string token) =>
            View();

        public IActionResult ActivationSuccess() =>
            View();

    }

}