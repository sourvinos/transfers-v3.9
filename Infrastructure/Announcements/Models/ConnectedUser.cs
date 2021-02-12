using System.ComponentModel.DataAnnotations;

namespace Transfers {

    public class ConnectedUser {

        public int Id { get; set; }

        [Key]
        public string ConnectionId { get; set; }

    }

}