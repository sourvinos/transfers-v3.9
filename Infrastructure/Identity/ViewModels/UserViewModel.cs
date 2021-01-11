namespace Transfers {

    public class UserViewModel {

        public string Id { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        public string OneTimePassword { get; set; }

    }

}