using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Transfers {

    [Authorize]
    [Route("api/[controller]")]

    public class UsersController : ControllerBase {

        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ILogger<UsersController> logger;

        public UsersController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, ILogger<UsersController> logger) {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<UserListViewModel>> Get() {
            return await userManager.Users.Select(u => new UserListViewModel {
                Id = u.Id,
                Username = u.UserName,
                Displayname = u.DisplayName,
                Email = u.Email,
                IsAdmin = u.IsAdmin
            }).OrderBy(o => o.Username).AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> GetUser(string id) {
            AppUser record = await userManager.FindByIdAsync(id);
            if (record == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            UserViewModel vm = new UserViewModel {
                Id = record.Id,
                Username = record.UserName,
                DisplayName = record.DisplayName,
                Email = record.Email,
                IsAdmin = record.IsAdmin
            };
            return StatusCode(200, vm);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> PutUser([FromRoute] string id, [FromBody] UserViewModel vm) {
            if (id == vm.Id && ModelState.IsValid) {
                AppUser record = await userManager.FindByIdAsync(id);
                if (record != null) {
                    await UpdateUser(record, vm);
                    await UpdateRole(record);
                    return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
                }
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            LoggerExtensions.LogException(0, logger, ControllerContext, vm, null);
            return StatusCode(400, new {
                response = ApiMessages.InvalidModel()
            });

        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id) {
            AppUser record = await userManager.FindByIdAsync(id);
            if (record == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            try {
                IdentityResult result = await userManager.DeleteAsync(record);
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

        private async Task<IdentityResult> UpdateUser(AppUser user, UserViewModel vm) {
            user.UserName = vm.Username;
            user.DisplayName = vm.DisplayName;
            user.Email = vm.Email;
            user.IsAdmin = vm.IsAdmin;
            return await userManager.UpdateAsync(user);
        }

        private async Task UpdateRole(AppUser user) {
            var roles = await userManager.GetRolesAsync(user);
            await userManager.RemoveFromRolesAsync(user, roles);
            await userManager.AddToRoleAsync(user, user.IsAdmin ? "Admin" : "User");
        }

    }

}