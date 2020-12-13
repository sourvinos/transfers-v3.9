using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Transfers {

    public interface ITransferRepository : IRepository<Transfer> {

        TransferGroupResultResource<TransferResource> Get(string dateIn);
        TransferOverview GetOverview(string fromDate, string toDate);
        TransferOverviewDetails GetOverviewDetails(string fromDate, string toDate);
        Task<IEnumerable<TotalPersonsPerDate>> GetTotalPersonsPerDate(string fromDate, string toDate);
        new Task<TransferResource> GetById(int id);
        Task<Transfer> GetByIdToDelete(int id);
        void Update(SaveTransferResource saveTransferResource);
        void AssignDriver(int driverId, int[] ids);

    }

}