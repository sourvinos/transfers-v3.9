using System;
using System.Linq;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Transfers {

    public static class Extensions  {

        public static void AddCors(IServiceCollection services) {
            services.AddCors(options =>
                options.AddPolicy("EnableCORS", builder => {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                }));
        }

        public static void AddIdentity(IServiceCollection services) {
            services
                .AddIdentity<AppUser, IdentityRole>(options => {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 1;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                    options.User.RequireUniqueEmail = true;
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                    options.Lockout.MaxFailedAccessAttempts = 5;
                    options.Lockout.AllowedForNewUsers = true;
                })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }

        public static void AddAuthentication(IConfiguration configuration, IServiceCollection services) {
            var tokenSettings = configuration.GetSection("TokenSettings");
            services.Configure<TokenSettings>(tokenSettings);
            var appSettings = tokenSettings.Get<TokenSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services
                .AddAuthentication(options => {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = appSettings.Site,
                        ValidAudience = appSettings.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ClockSkew = TimeSpan.Zero
                    };
                }).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                    configuration.Bind("CookieSettings", options));
        }

        public static void AddInterfaces(IServiceCollection services) {
            services.AddScoped<Token>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IDestinationRepository, DestinationRepository>();
            services.AddTransient<IDriverRepository, DriverRepository>();
            services.AddTransient<IPickupPointRepository, PickupPointRepository>();
            services.AddTransient<IPortRepository, PortRepository>();
            services.AddTransient<IRouteRepository, RouteRepository>();
            services.AddTransient<ITransferRepository, TransferRepository>();
        }

        public static Object NotValidModel(MethodBase method, Object record, ModelStateDictionary modelState) {
            return new {
                Controller = method.ReflectedType.Name,
                Method = method.Name,
                Record = record,
                Error = modelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)
            };
        }

        public static Object DBUpdateException(MethodBase method, Object record, DbUpdateException ex) {
            return new {
                Method = method.Name,
                Record = record,
                Error = ex.InnerException.Message
            };
        }

    }

}