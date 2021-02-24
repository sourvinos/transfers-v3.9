using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class ConnectedUserRepository : Repository<ConnectedUser>, IConnectedUserRepository {

        // private readonly IAlertRepository alertRepo;
        // private readonly IConnectedUserRepository connectedUserRepo;

        public ConnectedUserRepository(AppDbContext appDbContext) : base(appDbContext) { }

        public async Task<ConnectedUser> GetByUserId(string userId) {
            return await context.ConnectedUsers.Where(x => x.UserId == userId).FirstOrDefaultAsync();
        }

        public IEnumerable<JoinAlertConnectedUser> GetAlertsPerConnectedUser() {
            var result = context.ConnectedUsers.Join(context.Alerts, m => m.UserId, p => p.UserId, (m, p) => new JoinAlertConnectedUser {
                UserId = m.UserId,
                ConnectionId = m.ConnectionId,
                Unread = p.Unread
            });
            return result.ToList();
        }

    }

}