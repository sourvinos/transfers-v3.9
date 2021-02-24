using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Transfers {

    public class AlertHub : Hub {

        private readonly IConnectedUserRepository repo;

        public AlertHub(IConnectedUserRepository repo) {
            this.repo = repo;
        }

        // "BroadcastData" will be called by the "SendData" method in the hub service (Frontend)
        // "BroadcastMessage" will be caught by the hub service (Frontend)
        public Task BroadcastData(string message) {
            return Clients.All.SendAsync("BroadcastMessage", message);
        }

        // "BroadcastDataToUser" will be called by the "SendDataToUser" method in the hub service (Frontend)
        // "BroadcastMessageToUser" will be caught by the hub service (Frontend)
        public Task BroadcastDataToUser(string connectionId, string message) {
            return Clients.Client(connectionId).SendAsync("BroadcastMessageToUser", message);
        }

        public string GetConnectionId() {
            return Context.ConnectionId;
        }

    }

}