using System.Threading.Tasks;

namespace Transfers {

    public interface IAnnouncementRepository {

        Task<Announcement> Get(string userId);
        void Update();

    }

}