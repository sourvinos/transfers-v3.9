using System.Linq;

namespace Transfers {

    public class DestinationRepository : Repository<Destination>, IDestinationRepository {

        private readonly AppDbContext appDbContext;

        public DestinationRepository(AppDbContext appDbContext) : base(appDbContext) => (this.appDbContext) = (appDbContext);

        public int GetCount() {
            return appDbContext.Destinations.Count();
        }

    }

}