using System.ComponentModel.DataAnnotations;

namespace Transfers {

    public class Message {

        [Key]
        public string Key { get; set; }

        public string Value { get; set; }

    }

}