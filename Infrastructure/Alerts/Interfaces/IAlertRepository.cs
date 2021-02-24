using System.Threading.Tasks;

namespace Transfers {

    public interface IAlertRepository : IRepository<Alert> {

        Task<Alert> GetForUser(string userId);

    }

}