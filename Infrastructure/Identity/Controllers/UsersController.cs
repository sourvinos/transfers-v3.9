using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]

    public class UsersController : ControllerBase {

        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly MessageService messageService;

        public UsersController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, MessageService messageService) =>
            (this.userManager, this.roleManager, this.messageService) = (userManager, roleManager, messageService);

        [HttpGet]

        public async Task<IEnumerable<UserListViewModel>> Get() =>
            await userManager.Users.Select(u => new UserListViewModel {
                Id = u.Id,
                    Username = u.UserName,
                    Displayname = u.DisplayName,
                    Email = u.Email,
                    IsAdmin = u.IsAdmin
            }).OrderBy(o => o.Username).AsNoTracking().ToListAsync();

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id) {
            UserViewModel vm = new UserViewModel { };
            AppUser user = await userManager.FindByIdAsync(id);
            if (user != null) {
                vm.Id = user.Id;
                vm.Username = user.UserName;
                vm.DisplayName = user.DisplayName;
                vm.Email = user.Email;
                vm.IsAdmin = user.IsAdmin;
                return Ok(vm);
            }
            return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] string id, [FromBody] UserViewModel vm) {
            if (ModelState.IsValid) {
                if (id != vm.Id) return BadRequest(new { response = messageService.GetMessage("InvalidId") });
                AppUser user = await userManager.FindByIdAsync(id);
                if (user != null) {
                    await UpdateUser(user, vm);
                    await UpdateRole(user);
                    return Ok(new { response = ApiMessages.RecordUpdated() });
                }
                return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            }
            return StatusCode(419, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id) {
            AppUser user = await userManager.FindByIdAsync(id);
            if (user != null) {
                IdentityResult result = await userManager.DeleteAsync(user);
                if (result.Succeeded) {
                    return Ok(new { response = ApiMessages.RecordDeleted() });
                }
            }
            return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
        }

        private async Task<IdentityResult> UpdateUser(AppUser user, UserViewModel vm) {
            user.UserName = vm.Username;
            user.DisplayName = vm.DisplayName;
            user.Email = vm.Email;
            user.IsAdmin = vm.IsAdmin;
            return await userManager.UpdateAsync(user);
        }

        private async Task<bool> UpdateRole(AppUser user) {
            var roles = await userManager.GetRolesAsync(user);
            await userManager.RemoveFromRolesAsync(user, roles);
            await userManager.AddToRoleAsync(user, user.IsAdmin? "Admin": "User");
            return true;
        }

    }

}