using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Transfers {

    public class MessageHub : Hub {

        public Task Send(string message) {
            return Clients.All.SendAsync("Send", message);
        }

    }

}