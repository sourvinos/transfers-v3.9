using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class AnnouncementRepository : IAnnouncementRepository {

        protected readonly AppDbContext context;

        public AnnouncementRepository(AppDbContext context) {
            this.context = context;
        }

        public async Task<Announcement> Get(string userId) {
            return await context.Announcements.Where(x => x.UserId == userId).SingleOrDefaultAsync();
        }

        public void Update() {
            List<Announcement> announcements = context.Announcements.ToList();
            foreach (var announcement in announcements) {
                announcement.Unread = announcement.Unread += 1;
            }
            context.SaveChanges();
        }

    }

}