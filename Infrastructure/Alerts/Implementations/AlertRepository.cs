using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class AlertRepository : Repository<Alert>, IAlertRepository {

        public AlertRepository(AppDbContext appDbContext) : base(appDbContext) { }

        public async Task<Alert> GetForUser(string userId) {
            return await context.Alerts.Where(x => x.UserId == userId).SingleOrDefaultAsync();
        }

    }

}