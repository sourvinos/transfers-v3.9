using System.Threading.Tasks;

namespace Transfers {

    public interface IMessageRepository : IRepository<Message> {

        Task<string> GetByKey(string key, string language);
        
    }

}