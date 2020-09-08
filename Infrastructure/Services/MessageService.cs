using System.Threading.Tasks;

namespace Transfers {

    public class MessageService {

        private readonly IMessageRepository repo;

        public MessageService(IMessageRepository repo) =>
            (this.repo) = (repo);

        public async Task<string> GetMessage(string key, string language) {
            return await repo.GetByKey(key, language);
        }

    }

}