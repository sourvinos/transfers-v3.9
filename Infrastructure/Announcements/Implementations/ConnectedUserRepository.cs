namespace Transfers {

    public class ConnectedUserRepository  : Repository<ConnectedUser>, IConnectedUserRepository {

        public ConnectedUserRepository(AppDbContext appDbContext) : base(appDbContext) { }

    }

}