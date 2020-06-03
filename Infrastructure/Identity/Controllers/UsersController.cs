using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Route("api/[controller]")]
    public class UsersController : ControllerBase {

        private readonly UserManager<AppUser> userManager;

        public UsersController(UserManager<AppUser> userManager) =>
            (this.userManager) = (userManager);

        [HttpGet]

        public async Task<IEnumerable<UserListViewModel>> Get() =>
            await userManager.Users.Select(u => new UserListViewModel {
                Id = u.Id,
                    Username = u.UserName,
                    Displayname = u.DisplayName,
                    Email = u.Email
            }).OrderBy(o => o.Username).AsNoTracking().ToListAsync();

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id) {
            UserViewModel vm = new UserViewModel { };
            AppUser user = await userManager.FindByIdAsync(id);
            if (user != null) {
                vm.Id = user.Id;
                vm.Username = user.UserName;
                vm.Displayname = user.DisplayName;
                vm.Email = user.Email;
                return Ok(vm);
            }
            return NotFound(new { response = ApiMessages.RecordNotFound() });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] string id, [FromBody] UserViewModel vm) {
            if (ModelState.IsValid) {
                if (id != vm.Id) return BadRequest(new { response = ApiMessages.InvalidId() });
                AppUser user = await userManager.FindByIdAsync(id);
                if (user != null) {
                    user.UserName = vm.Username;
                    user.DisplayName = vm.Displayname;
                    user.Email = vm.Email;
                    IdentityResult result = await userManager.UpdateAsync(user);
                    if (result.Succeeded) {
                        return Ok(new { response = ApiMessages.RecordUpdated() });
                    }
                    return BadRequest(new { response = result.Errors.Select(x => x.Description) });
                }
                return NotFound(new { response = ApiMessages.RecordNotFound() });
            }
            return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
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
            return NotFound(new { response = ApiMessages.RecordNotFound() });
        }

    }

}