using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class NotificationRepository : INotificationRepository {

        protected readonly AppDbContext context;

        public NotificationRepository(AppDbContext context) {
            this.context = context;
        }

        public async Task<Notification> Get(string userId) {
            return await context.Notifications.FirstOrDefaultAsync(x => x.UserId == userId);
        }

    }

}