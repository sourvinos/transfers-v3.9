namespace Transfers {

    public static class EmailMessages {

        public static string AccountActivatedSuccessfully(string language) {
            switch (language) {
                case "el-GR":
                    return "Αυτός ο λογαριασμός είναι τώρα ενεργός!";
                case "en-GB":
                    return "This account is now active!";
                case "de-DE":
                    return "Dieses Benutzerkonto ist jetzt aktiv!";
                case "cs-CZ":
                    return "Účet je nyní aktivní!";
                default:
                    return "";
            }
        }

        public static string AccountAlreadyActivatedOrError(string language) {
            switch (language) {
                case "el-GR":
                    return "Αυτός ο λογαριασμός είναι ήδη ενεργός!";
                case "en-GB":
                    return "This account is already active!";
                case "de-DE":
                    return "Dieses Benutzerkonto ist bereits aktiv!";
                case "cs-CZ":
                    return "Účet je již aktivní!";
                default:
                    return "";
            }
        }

        public static string[] EmailBody(string url) {
            switch (url.Substring(url.Length - 5, 5)) {
                case "el-GR":
                    return new[] {
                        "Γεια σας, ",
                        "Για να μπορέσετε να συνδεθείτε στην online πλατφόρμα μας και να κάνετε κρατήσεις, η εγγραφή σας πρέπει να επιβεβαιωθεί.",
                        "Επιβεβαίωση" };
                case "en-GB":
                    return new[] {
                        "Hello, ",
                        "In order to be able to connect to our online platform and make reservations, your registration must be confirmed.",
                        "Confirm" };
                case "de-DE":
                    return new[] {
                        "Hallo, ",
                        "Um eine Verbindung zu unserer Online-Plattform herstellen und Reservierungen vornehmen zu können, muss Ihre Registrierung bestätigt werden.",
                        "Bestätigen" };
                case "cs-CZ":
                    return new[] {
                        "Ahoj",
                        "Abyste se mohli připojit k naší online platformě a provádět rezervace, musí být vaše registrace potvrzena.",
                        "Potvrdit" };
                default:
                    return new[] {
                        "Hallo, ",
                        "Um eine Verbindung zu unserer Online-Plattform herstellen und Reservierungen vornehmen zu können, muss Ihre Registrierung bestätigt werden.",
                        "Bestätigen" };
            }
        }

    }

}