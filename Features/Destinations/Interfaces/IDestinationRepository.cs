namespace Transfers {

    public interface IDestinationRepository : IRepository<Destination> {

        int GetCount();

    }

}