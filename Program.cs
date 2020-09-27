using System.Net;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Transfers {

    public class Program {

        public static void Main(string[] args) {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) {
            return WebHost.CreateDefaultBuilder()
                .UseKestrel(options => {
                    options.ListenLocalhost(5001);
                    options.ListenLocalhost(5002, listenOptions => {
                        listenOptions.UseHttps("localhost.pfx", "74656");
                    });
                })
                .UseStartup<Startup>()
                .Build();
        }

    }

}