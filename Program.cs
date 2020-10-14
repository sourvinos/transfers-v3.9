using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Transfers {

    public class Program {

        public static void Main (string[] args) {
            BuildWebHost (args).Run ();
        }

        public static IWebHost BuildWebHost (string[] args) {
            return WebHost.CreateDefaultBuilder ()
                .UseKestrel ()
                .UseStartup<Startup> ()
                .Build ();
        }

    }

}