using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]

    public class AccountController : Controller {

        private readonly IEmailSender emailSender;
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IEmailSender emailSender) =>
            (this.userManager, this.signInManager, this.emailSender) = (userManager, signInManager, emailSender);

        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel formData) {
            if (ModelState.IsValid) {
                var user = new AppUser {
                    Email = formData.Email,
                    DisplayName = formData.Displayname,
                    UserName = formData.Username,
                    IsAdmin = formData.IsAdmin,
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                var result = await userManager.CreateAsync(user, formData.Password);
                if (result.Succeeded) {
                    await userManager.AddToRoleAsync(user, user.IsAdmin? "Admin": "User");
                    string token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    string callbackUrl = Url.Action("ConfirmEmail", "Account", new { UserId = user.Id, Token = token }, protocol : HttpContext.Request.Scheme);
                    emailSender.SendRegistrationEmail(user.Email, user.DisplayName, callbackUrl);
                    return StatusCode(200, new { response = ApiMessages.RecordCreated() }); // Ok
                } else {
                    return StatusCode(492, new { response = result.Errors.Select(x => x.Description) }); // unableToRegisterUser
                }
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) }); // invalidModel
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token) {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) { return RedirectToAction("ActivationError", "Notifications"); }
            var result = await userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded) {
                return RedirectToAction("ActivationSuccess", "Notifications", new { userId, token });
            }
            return RedirectToAction("ActivationError", "Notifications");
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model) {
            if (ModelState.IsValid) {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user != null && await userManager.IsEmailConfirmedAsync(user)) {
                    string token = await userManager.GeneratePasswordResetTokenAsync(user);
                    string tokenEncoded = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
                    string baseUrl = $"{Request.Scheme}://{Request.Host.Value}{Request.PathBase.Value}";
                    string passwordResetLink = Url.Content($"{baseUrl}/resetPassword?email={model.Email}&token={tokenEncoded}");
                    emailSender.SendResetPasswordEmail(user.DisplayName, user.Email, passwordResetLink);
                    return StatusCode(200, new { response = ApiMessages.EmailInstructions() }); // Ok
                }
                return StatusCode(200, new { response = ApiMessages.EmailInstructions() }); // Ok
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) }); // invalidModel
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IActionResult ResetPassword([FromQuery] string email, [FromQuery] string tokenEncoded) {
            var model = new ResetPasswordViewModel {
                Email = email,
                Token = tokenEncoded
            };
            return StatusCode(200, new { response = model }); // Ok
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model) {
            if (ModelState.IsValid) {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user != null) {
                    var result = await userManager.ResetPasswordAsync(user, Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Token)), model.Password);
                    if (result.Succeeded) {
                        return StatusCode(200, new { response = ApiMessages.PasswordReset() }); // Ok
                    }
                    return StatusCode(494, new { response = result.Errors.Select(x => x.Description) }); // unableToChangePassword
                }
                return StatusCode(404, new { response = ApiMessages.RecordNotFound() }); // recordNotFound
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) }); // invalidModel
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel vm) {
            if (ModelState.IsValid) {
                var user = await userManager.FindByIdAsync(vm.UserId);
                if (user != null) {
                    var result = await userManager.ChangePasswordAsync(user, vm.CurrentPassword, vm.Password);
                    if (result.Succeeded) {
                        await signInManager.RefreshSignInAsync(user);
                        return StatusCode(200, new { response = ApiMessages.PasswordChanged() }); // Ok
                    }
                    return StatusCode(494, new { response = result.Errors.Select(x => x.Description) }); // unableToChangePassword
                }
                return StatusCode(404, new { response = ApiMessages.RecordNotFound() }); // recordNotFound
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) }); // invalidModel
        }

    }

}