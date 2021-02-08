using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Transfers {

    public class NotificationHub : Hub {

        public Task Send(string group, string message) {
            return Clients.All.SendAsync("Send", message);
        }

    }

}