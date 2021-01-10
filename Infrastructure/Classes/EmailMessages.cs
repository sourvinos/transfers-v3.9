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

        public static string[] FirstLoginCredentials(string language) {
            switch (language) {
                case "el-GR":
                    return new[] {
                        "Γεια σας, ",
                        "Χρησιμοποιήστε τα παρακάτω στοιχεία για να συνδεθείτε:",
                        "Χρήστης: " ,
                        "Κωδικός: ",
                        "Προσοχή!",
                        "Ο κωδικός είναι προσωρινός και μπορεί να χρησιμοποιηθεί μόνο μία φορά.",
                        "Πρέπει να τον αλλάξετε αμέσως μετά την πρώτη σύνδεσή σας.",
                        "Σύνδεση",
                        "Ευχαριστούμε που χρησιμοποιείτε την online πλατφόρμα μας.",
                        "Με φιλικούς χαιρετισμούς,"
                    };
                case "en-GB":
                    return new[] {
                        "Hello, ",
                        "Use the following credentials to login:",
                        "User: " ,
                        "Password: ",
                        "Warning!",
                        "This is a temporary password and can be used only once.",
                        "You must change it immediateley after your first login.",
                        "Login",
                        "Thank you for using our online platform.",
                        "Best regards,"
                     };
                case "de-DE":
                    return new[] {
                        ""
                    };
                case "cs-CZ":
                    return new[] {
                        ""
                    };
                default:
                    return new[] {
                        ""
                    };
            }
        }

        public static string[] ResetPassword(string language) {
            switch (language) {
                case "el-GR":
                    return new[] {
                        "Γεια σας, ",
                        "Εχετε ζητήσει επαναφορά κωδικού.",
                        "Κάντε κλικ στο παρακάτω κουμπί για να καταχωρήσετε νέο κωδικό.",
                        "Επαναφορά κωδικού",
                        "Ευχαριστούμε που χρησιμοποιείτε την online πλατφόρμα μας",
                        "Με φιλικούς χαιρετισμούς,"
                    };
                case "en-GB":
                    return new[] {
                        "Hello, ",
                        "You have requested a password reset.",
                        "Click the following button to set a new password.",
                        "Password reset",
                        "Thank you for using our online platform.",
                        "Kind regards,"
                    };
                default:
                    return new[] {
                        "Hello, ",
                        "You have requested a password reset.",
                        "Click the following button to set a new password.",
                        "Password reset",
                        "Thank you for using our online platform",
                        "Kind regards,"
                    };
            }
        }

    }

}