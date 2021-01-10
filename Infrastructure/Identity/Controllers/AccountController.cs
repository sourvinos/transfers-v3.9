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

    public class AccountController : Controller {

        private readonly IEmailSender emailSender;
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IEmailSender emailSender) {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.emailSender = emailSender;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel formData) {
            if (ModelState.IsValid) {
                var user = new AppUser {
                    Email = formData.Email,
                    DisplayName = formData.Displayname,
                    UserName = formData.Username,
                    IsAdmin = formData.IsAdmin,
                    EmailConfirmed = true,
                    IsFirstLogin = true,
                    OneTimePassword = formData.Password,
                    IsOneTimePasswordChanged = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                var result = await userManager.CreateAsync(user, formData.Password);
                if (result.Succeeded) {
                    await userManager.AddToRoleAsync(user, user.IsAdmin ? "Admin" : "User");
                    return StatusCode(200, new {
                        response = ApiMessages.RecordCreated()
                    });
                } else {
                    return StatusCode(492, new { response = result.Errors.Select(x => x.Description) });
                }
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token, string language) {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) { return RedirectToAction("ActivationError", "Notifications"); }
            if (!user.EmailConfirmed) {
                var result = await userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded) {
                    return View("ActivationSuccess", new ActivationMessage { description = EmailMessages.AccountActivatedSuccessfully(language) });
                }
            }
            return View("ActivationError", new ActivationMessage { description = EmailMessages.AccountAlreadyActivatedOrError(language) });
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
                    string passwordResetLink = Url.Content($"{baseUrl}/account/resetPassword?email={model.Email}&token={tokenEncoded}");
                    emailSender.SendResetPasswordEmail(user.DisplayName, user.Email, passwordResetLink, model.Language);
                    return StatusCode(200, new { response = ApiMessages.EmailInstructions() });
                }
                return StatusCode(200, new { response = ApiMessages.EmailInstructions() });
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IActionResult ResetPassword([FromQuery] string email, [FromQuery] string tokenEncoded) {
            var model = new ResetPasswordViewModel {
                Email = email,
                Token = tokenEncoded
            };
            return StatusCode(200, new { response = model });
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model) {
            if (ModelState.IsValid) {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user != null) {
                    var result = await userManager.ResetPasswordAsync(user, Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Token)), model.Password);
                    if (result.Succeeded) {
                        await signInManager.RefreshSignInAsync(user);
                        await this.UpdateIsOneTimePasswordChanged(user);
                        return StatusCode(200, new { response = ApiMessages.PasswordReset() });
                    }
                    return StatusCode(494, new { response = result.Errors.Select(x => x.Description) });
                }
                return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel vm) {
            if (ModelState.IsValid) {
                var user = await userManager.FindByIdAsync(vm.UserId);
                if (user != null) {
                    var result = await userManager.ChangePasswordAsync(user, vm.CurrentPassword, vm.Password);
                    if (result.Succeeded) {
                        await signInManager.RefreshSignInAsync(user);
                        await this.UpdateIsOneTimePasswordChanged(user);
                        return StatusCode(200, new { response = ApiMessages.PasswordChanged() });
                    }
                    return StatusCode(494, new { response = result.Errors.Select(x => x.Description) });
                }
                return StatusCode(404, new { response = ApiMessages.RecordNotFound() });
            }
            return StatusCode(400, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
        }

        private async Task<IdentityResult> UpdateIsOneTimePasswordChanged(AppUser user) {
            user.IsOneTimePasswordChanged = true;
            return await userManager.UpdateAsync(user);
        }

    }

}