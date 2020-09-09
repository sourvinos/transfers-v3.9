using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    public class MessageRepository : Repository<Message>, IMessageRepository {

        public MessageRepository(AppDbContext context) : base(context) { }

        async Task<string> IMessageRepository.GetByKey(string key) {
            return await context.Messages.AsNoTracking().Where(x => x.Key == key).Select(a => a.Description).FirstAsync();
        }
    }

}