namespace Transfers {

    public static class ApiMessages {

        // Only used by the API
        // In normal program execution they will be replaced by Angular in the selected language

        public static string AccountNotConfirmed() { return "This account is pending email confirmation."; }
        public static string AuthenticationFailed() { return "Authentication failed."; }
        public static string DefaultDriverAlreadyExists() { return "There is already a default driver."; }
        public static string EmailInstructions() { return "An email was sent with instructions."; }
        public static string PasswordChanged() { return "Password was changed successfully."; }
        public static string PasswordReset() { return "Password was reset successfully."; }
        public static string RecordCreated() { return "Record created."; }
        public static string RecordDeleted() { return "Record deleted."; }
        public static string RecordInUse() { return "This record is in use and can not be deleted."; }
        public static string RecordNotFound() { return "Record not found."; }
        public static string RecordUpdated() { return "Record updated."; }

    }

}