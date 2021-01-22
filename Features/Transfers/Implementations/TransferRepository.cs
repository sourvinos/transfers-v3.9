using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class TransferRepository : Repository<Transfer>, ITransferRepository {

        private readonly IMapper mapper;
        private readonly AppDbContext appDbContext;

        public TransferRepository(AppDbContext appDbContext, IMapper mapper) : base(appDbContext) => (this.appDbContext, this.mapper) = (appDbContext, mapper);

        TransferGroupResultResource<TransferResource> ITransferRepository.Get(string date) {
            DateTime _date = Convert.ToDateTime(date);
            var details = appDbContext.Transfers
                .Include(x => x.Customer)
                .Include(x => x.PickupPoint).ThenInclude(y => y.Route).ThenInclude(z => z.Port)
                .Include(x => x.Destination)
                .Include(x => x.Driver)
                .Where(x => x.DateIn == _date)
                .OrderBy(x => x.DateIn);
            var totalPersonsPerCustomer = appDbContext.Transfers.Include(x => x.Customer).Where(x => x.DateIn == _date).GroupBy(x => new { x.Customer.Description }).Select(x => new TotalPersonsPerCustomer { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons) }).OrderBy(o => o.Description);
            var totalPersonsPerDestination = appDbContext.Transfers.Include(x => x.Destination).Where(x => x.DateIn == _date).GroupBy(x => new { x.Destination.Description }).Select(x => new TotalPersonsPerDestination { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons) }).OrderBy(o => o.Description);
            var totalPersonsPerRoute = appDbContext.Transfers.Include(x => x.PickupPoint.Route).Where(x => x.DateIn == _date).GroupBy(x => new { x.PickupPoint.Route.Abbreviation }).Select(x => new TotalPersonsPerRoute { Description = x.Key.Abbreviation, Persons = x.Sum(s => s.TotalPersons) }).OrderBy(o => o.Description);
            var totalPersonsPerDriver = appDbContext.Transfers.Include(x => x.Driver).Where(x => x.DateIn == _date).OrderBy(o => o.Driver.Description).GroupBy(x => new { x.Driver.Description }).Select(x => new TotalPersonsPerDriver { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons) }).OrderBy(o => o.Description);
            var totalPersonsPerPort = appDbContext.Transfers.Include(x => x.PickupPoint.Route.Port).Where(x => x.DateIn == _date).OrderBy(o => o.PickupPoint.Route.Port.Description).GroupBy(x => new { x.PickupPoint.Route.Port.Description }).Select(x => new TotalPersonsPerPort { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons) }).OrderBy(o => o.Description);
            var groupResult = new TransferGroupResult<Transfer> {
                Persons = details.Sum(x => x.TotalPersons),
                Transfers = details.ToList(),
                PersonsPerCustomer = totalPersonsPerCustomer.ToList(),
                PersonsPerDestination = totalPersonsPerDestination.ToList(),
                PersonsPerRoute = totalPersonsPerRoute.ToList(),
                PersonsPerDriver = totalPersonsPerDriver.ToList(),
                PersonsPerPort = totalPersonsPerPort.ToList()
            };
            return mapper.Map<TransferGroupResult<Transfer>, TransferGroupResultResource<TransferResource>>(groupResult);
        }

        public TransferOverview GetOverview(string fromDate, string toDate) {

            DateTime _fromDate = Convert.ToDateTime(fromDate);
            DateTime _toDate = Convert.ToDateTime(toDate);

            int persons = appDbContext.Transfers.Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).Sum(s => s.TotalPersons);
            float adults = appDbContext.Transfers.Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).Sum(s => s.Adults);
            float kids = appDbContext.Transfers.Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).Sum(s => s.Kids);
            float free = appDbContext.Transfers.Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).Sum(s => s.Free);

            var transferOverview = new TransferOverview {
                Persons = persons,
                Adults = adults,
                Kids = kids,
                Free = free
            };

            return transferOverview;

        }

        public TransferOverviewDetails GetOverviewDetails(string fromDate, string toDate) {

            DateTime _fromDate = Convert.ToDateTime(fromDate);
            DateTime _toDate = Convert.ToDateTime(toDate);

            var totalPersonsPerCustomer = appDbContext.Transfers.Include(x => x.Customer).Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).GroupBy(x => new { x.Customer.Description }).Select(x => new TotalPersonsPerCustomer { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons), PersonsLastYear = 0, Percent = "" });
            var totalPersonsPerDestination = appDbContext.Transfers.Include(x => x.Destination).Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).GroupBy(x => new { x.Destination.Description }).Select(x => new TotalPersonsPerDestination { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons), PersonsLastYear = 0, Percent = "" });
            var totalPersonsPerDriver = appDbContext.Transfers.Include(x => x.Driver).Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).GroupBy(x => new { x.Driver.Description }).Select(x => new TotalPersonsPerDriver { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons), PersonsLastYear = 0, Percent = "" });
            var totalPersonsPerPort = appDbContext.Transfers.Include(x => x.PickupPoint.Route.Port).Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate).GroupBy(x => new { x.PickupPoint.Route.Port.Description }).Select(x => new TotalPersonsPerPort { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons), PersonsLastYear = 0, Percent = "" });
            var totalPersonsPerRoute = appDbContext.Transfers.Include(x => x.PickupPoint.Route)
                .Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate)
                .GroupBy(x => new { x.PickupPoint.Route.Description })
                .Select(x => new TotalPersonsPerRoute { Description = x.Key.Description, Persons = x.Sum(s => s.TotalPersons), PersonsLastYear = 0, Percent = "" });

            var transferOverviewDetails = new TransferOverviewDetails {
                TotalPersonsPerCustomer = totalPersonsPerCustomer.ToList(),
                TotalPersonsPerDestination = totalPersonsPerDestination.ToList(),
                TotalPersonsPerDriver = totalPersonsPerDriver.ToList(),
                TotalPersonsPerPort = totalPersonsPerPort.ToList(),
                TotalPersonsPerRoute = totalPersonsPerRoute.ToList(),
            };

            return transferOverviewDetails;

        }

        public async Task<IEnumerable<TotalPersonsPerDate>> GetTotalPersonsPerDate(string fromDate, string toDate) {

            DateTime _fromDate = Convert.ToDateTime(fromDate);
            DateTime _toDate = Convert.ToDateTime(toDate);

            var totalPersons = appDbContext.Transfers
                .Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate)
                .GroupBy(x => x.DateIn)
                .Select(x => new TotalPersonsPerDate { DateIn = x.Key.ToString(), Persons = x.Sum(s => s.TotalPersons) })
                .OrderBy(x => x.DateIn);

            return await totalPersons.ToListAsync();

        }

        public async Task<IEnumerable<TotalPersonsPerDate>> GetTotalPersonsPerMonth(string fromDate, string toDate) {

            DateTime _fromDate = Convert.ToDateTime(fromDate);
            DateTime _toDate = Convert.ToDateTime(toDate);

            var totalPersons = appDbContext.Transfers
                .Where(x => x.DateIn >= _fromDate && x.DateIn <= _toDate)
                .GroupBy(x => new { x.DateIn.Year, x.DateIn.Month })
                .Select(x => new TotalPersonsPerDate { DateIn = x.Key.Year.ToString() + "-" + ("0" + x.Key.Month.ToString()).Substring(("0" + x.Key.Month.ToString()).Length - 2, 2), Persons = x.Sum(s => s.TotalPersons) })
                .OrderBy(x => x.DateIn);

            return await totalPersons.ToListAsync();

        }

        public new async Task<TransferResource> GetById(int id) {
            var transfer = await appDbContext.Transfers
                .Include(x => x.Customer)
                .Include(x => x.PickupPoint).ThenInclude(y => y.Route).ThenInclude(z => z.Port)
                .Include(x => x.Destination)
                .Include(x => x.Driver)
                .SingleOrDefaultAsync(m => m.Id == id);
            return mapper.Map<Transfer, TransferResource>(transfer);
        }

        public async Task<Transfer> GetByIdToDelete(int id) {
            var transfer = await appDbContext.Transfers.SingleOrDefaultAsync(x => x.Id == id);
            return transfer;
        }

        public void Update(SaveTransferResource saveTransferResource) {
            appDbContext.Entry(appDbContext.Transfers.Find(saveTransferResource.Id)).CurrentValues.SetValues(saveTransferResource);
            appDbContext.SaveChanges();
        }

        public void AssignDriver(int driverId, int[] ids) {
            var transfers = appDbContext.Transfers.Where(x => ids.Contains(x.Id)).ToList();
            transfers.ForEach(a => a.DriverId = driverId);
            appDbContext.SaveChanges();
        }

    }

}