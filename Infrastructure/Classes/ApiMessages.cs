namespace Transfers {

    public static class ApiMessages {

        // Only used by the API
        // In normal program execution they will be replaced by Angular and in the appropriate language

        public static string RecordCreated() { return "Record created."; }
        public static string RecordUpdated() { return "Record updated."; }
        public static string RecordDeleted() { return "Record deleted."; }
        public static string EmailInstructions(string email) { return $"An email was sent to { email } with instructions."; }
        public static string PasswordReset() { return "Password was reset successfully."; }
        public static string PasswordChanged() { return "Password was changed successfully."; }

    }

}