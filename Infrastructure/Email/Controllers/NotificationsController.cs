using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    public class NotificationsController : Controller {

        private IWebHostEnvironment _hostingEnv;

        public NotificationsController(IWebHostEnvironment env) {
            _hostingEnv = env;
        }

        public IActionResult ActivationError(string userId, string token) =>
            View(_hostingEnv);

        public IActionResult ActivationSuccess() =>
            View();

    }

}