using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Transfers {

    [Route("api/[controller]")]
    public class AuthController : ControllerBase {

        private readonly UserManager<AppUser> userManager;
        private readonly TokenSettings settings;
        private readonly AppDbContext db;
        private readonly ProductService productService;

        public AuthController(UserManager<AppUser> userManager, IOptions<TokenSettings> settings, AppDbContext db, ProductService productService) =>
            (this.userManager, this.settings, this.db, this.productService) = (userManager, settings.Value, db, productService);

        [HttpPost("[action]")]
        public async Task<IActionResult> Auth([FromBody] TokenRequest model) {
            switch (model.GrantType) {
                case "password":
                    return await GenerateNewToken(model);
                case "refresh_token":
                    return await RefreshToken(model);
                default:
                    // return Unauthorized(new { response = ApiErrorMessages.AuthenticationFailed() });
                    return Unauthorized(new { response = "OH MY!" });
            }
        }

        private async Task<IActionResult> GenerateNewToken(TokenRequest model) {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password)) {
                if (!await userManager.IsEmailConfirmedAsync(user)) {
                    return BadRequest(new { response = ApiErrorMessages.AccountNotConfirmed() });
                }
                var newRefreshToken = CreateRefreshToken(settings.ClientId, user.Id);
                var oldRefreshTokens = db.Tokens.Where(rt => rt.UserId == user.Id);
                if (oldRefreshTokens != null) {
                    foreach (var token in oldRefreshTokens) {
                        db.Tokens.Remove(token);
                    }
                }
                db.Tokens.Add(newRefreshToken);
                await db.SaveChangesAsync();
                var accessToken = await CreateAccessToken(user, newRefreshToken.Value);
                return Ok(new { response = accessToken });
            }
            return Unauthorized(new { response = ApiErrorMessages.AuthenticationFailed() });
        }

        private Token CreateRefreshToken(string clientId, string userId) {
            return new Token() {
                ClientId = clientId,
                    UserId = userId,
                    Value = Guid.NewGuid().ToString("N"),
                    CreatedDate = DateTime.UtcNow,
                    ExpiryTime = DateTime.UtcNow.AddMinutes(90)
            };
        }

        private async Task<TokenResponse> CreateAccessToken(AppUser user, string refreshToken) {
            double tokenExpiryTime = Convert.ToDouble(settings.ExpireTime);
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.Secret));
            var roles = await userManager.GetRolesAsync(user);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Role, roles.FirstOrDefault()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim("LoggedOn", DateTime.Now.ToString()),
                }),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                Issuer = settings.Site,
                Audience = settings.Audience,
                Expires = DateTime.UtcNow.AddMinutes(tokenExpiryTime)
            };
            var newtoken = tokenHandler.CreateToken(tokenDescriptor);
            var encodedToken = tokenHandler.WriteToken(newtoken);
            return new TokenResponse() {
                token = encodedToken,
                    expiration = newtoken.ValidTo,
                    refresh_token = refreshToken,
                    roles = roles.FirstOrDefault(),
                    userId = user.Id,
                    displayName = user.DisplayName
            };
        }

        private async Task<IActionResult> RefreshToken(TokenRequest model) {
            try {
                var rt = db.Tokens.FirstOrDefault(t => t.ClientId == settings.ClientId && t.Value == model.RefreshToken.ToString());
                if (rt == null) return new UnauthorizedResult();
                if (rt.ExpiryTime < DateTime.UtcNow) return Unauthorized(new { response = ApiErrorMessages.AuthenticationFailed() });
                var user = await userManager.FindByIdAsync(rt.UserId);
                if (user == null) return Unauthorized(new { response = ApiErrorMessages.AuthenticationFailed() });
                var rtNew = CreateRefreshToken(rt.ClientId, rt.UserId);
                db.Tokens.Remove(rt);
                db.Tokens.Add(rtNew);
                db.SaveChanges();
                var token = await CreateAccessToken(user, rtNew.Value);
                return Ok(new { response = token });
            } catch {
                return Unauthorized(new { response = ApiErrorMessages.AuthenticationFailed() });
            }
        }

    }

}