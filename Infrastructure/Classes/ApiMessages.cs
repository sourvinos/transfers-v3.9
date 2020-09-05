namespace Transfers {

    public static class ApiMessages {

        public static string RecordCreated() { return "Record created."; }
        public static string RecordUpdated() { return "Record updated."; }
        public static string RecordDeleted() { return "Record deleted."; }
        public static string EmailInstructions(string email) { return $"An email was sent to { email } with instructions."; }
        public static string PasswordReset() { return "Password was reset successfully."; }
        public static string PasswordChanged() { return "Password was changed successfully."; }

    }

}