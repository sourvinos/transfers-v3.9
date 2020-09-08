using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class MessageRepository : Repository<Message>, IMessageRepository {

        public MessageRepository(AppDbContext context) : base(context) { }

        async Task<string> IMessageRepository.GetByKey(string key, string language) {
            return await context.Messages.AsNoTracking().Where(x => x.Key == key && x.Language == language).Select(a => a.Description).FirstAsync();
        }
    }

}