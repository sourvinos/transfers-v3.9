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

    }

}