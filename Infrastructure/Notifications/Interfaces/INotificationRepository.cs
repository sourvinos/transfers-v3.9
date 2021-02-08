using System.Threading.Tasks;

namespace Transfers {

    public interface INotificationRepository {

        Task<Notification> Get(string userId);
       
    }

}