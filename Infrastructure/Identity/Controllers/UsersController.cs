using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers
{

    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]

    public class UsersController : ControllerBase {

        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public UsersController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager) =>
            (this.userManager, this.roleManager) = (userManager, roleManager);

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
            AppUser record = await userManager.FindByIdAsync(id);
            if (record == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            vm.Id = record.Id;
            vm.Username = record.UserName;
            vm.DisplayName = record.DisplayName;
            vm.Email = record.Email;
            vm.IsAdmin = record.IsAdmin;
            return StatusCode(200, vm);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] string id, [FromBody] UserViewModel vm) {
            if (id == vm.Id && ModelState.IsValid) {
                AppUser record = await userManager.FindByIdAsync(id);
                if (record != null) {
                    await UpdateUser(record, vm);
                    await UpdateRole(record);
                    return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
                }
                return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            }
            return StatusCode(400, new { response = Extensions.NotValidModel(MethodBase.GetCurrentMethod(), vm, ModelState) });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id) {
            AppUser record = await userManager.FindByIdAsync(id);
            if (record == null) return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            try {
                IdentityResult result = await userManager.DeleteAsync(record);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return StatusCode(491, new { response = ApiMessages.RecordInUse() });
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
            await userManager.AddToRoleAsync(user, user.IsAdmin? "Admin": "User");
        }

    }

}