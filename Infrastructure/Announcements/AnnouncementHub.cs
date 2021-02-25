using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Transfers {

    public class AnnouncementHub : Hub {

        // "BroadcastData" will be called by the "SendData" method in the hub service (Frontend)
        // "BroadcastMessage" will be caught by the hub service (Frontend)
        public Task BroadcastData(string message) {
            return Clients.All.SendAsync("BroadcastMessage", message);
        }

    }

}