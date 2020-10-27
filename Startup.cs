using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NLog;

namespace Transfers {

    public class Startup {

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration) {
            LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services) {
            // Static
            Extensions.AddIdentity(services);
            Extensions.AddAuthentication(Configuration, services);
            Extensions.AddCors(services);
            Extensions.AddInterfaces(services);
            // Base
            services.Configure<RazorViewEngineOptions>(option => option.ViewLocationExpanders.Add(new FeatureViewLocationExpander()));
            services.AddAntiforgery(options => { options.Cookie.Name = "_af"; options.Cookie.HttpOnly = true; options.Cookie.SecurePolicy = CookieSecurePolicy.Always; options.HeaderName = "X-XSRF-TOKEN"; });
            services.AddAutoMapper();
            services.AddSingleton<ILoggerManager, LoggerManager>();
            services.AddControllersWithViews();
            services.AddDbContext<AppDbContext>(options => options.UseSqlite(Configuration["ConnectionStrings:SqliteConnection"]));
            services.AddEmailSenders();
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
            services.Configure<CookiePolicyOptions>(options => { options.CheckConsentNeeded = context => true; options.MinimumSameSitePolicy = SameSiteMode.None; });
            services.Configure<OutlookSettings>(options => Configuration.GetSection("OutlookSettings").Bind(options));
            services.Configure<SendGridSettings>(options => Configuration.GetSection("SendGridSettings").Bind(options));
            services.Configure<TokenSettings>(options => Configuration.GetSection("TokenSettings").Bind(options));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<AppUser> userManager, ILoggerManager logger) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseStaticFiles();
            if (!env.IsDevelopment()) {
                app.UseSpaStaticFiles();
            }
            app.ConfigureExceptionHandler(logger);
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHttpsRedirection();
            app.UseStatusCodePages();
            app.UseHttpsRedirection();
            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa => {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment()) {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

    }

}