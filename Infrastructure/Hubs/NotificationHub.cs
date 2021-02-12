using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Transfers {

    public class NotificationHub : Hub {

        private readonly IConnectedUserRepository connectedUserRepo;

        public NotificationHub(IConnectedUserRepository connectedUserRepo) {
            this.connectedUserRepo = connectedUserRepo;
        }

        public Task SendMessageToAll(string message) {
            return Clients.All.SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync() {
            connectedUserRepo.Create(new ConnectedUser { ConnectionId = Context.ConnectionId });
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex) {
            connectedUserRepo.Delete(new ConnectedUser { ConnectionId = Context.ConnectionId });
            await base.OnDisconnectedAsync(ex);
        }

    }

}