using System.Collections.Generic;
using System.Threading.Tasks;

namespace Transfers {

    public interface IConnectedUserRepository : IRepository<ConnectedUser> {

        Task<ConnectedUser> GetByUserId(string userId);
        IEnumerable<JoinAlertConnectedUser> GetAlertsPerConnectedUser();
        
    }

}