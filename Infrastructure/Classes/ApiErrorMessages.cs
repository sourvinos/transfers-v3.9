using System;
using System.IO;
using LiteDB;

namespace Transfers {

    public static class ApiErrorMessages {

        public static string RecordNotFound() { return "Record does not exist."; }
        public static string InvalidId() { return "Given Id and actual Id do not match."; }
        public static string RecordInUse() { return "Record is in use and can not be deleted."; }
        public static string AccountNotConfirmed() { return "This account is pending email confirmation."; }
        public static string EmailNotFound(string email) { return $"Email { email } does not exist."; }
        public static string AuthenticationFailed() { return ReadFromLiteDB(); }
        public static string UserNotFound() { return "User not found."; }
        public static string DefaultDriverAlreadyExists(string defaultDriver) { return $"Driver {defaultDriver} is already the default driver."; }

        public static string InsertToLiteDB() {
            using(var db = new LiteDatabase(@"D:\Downloads\MyData.db.light")) {
                var col = db.GetCollection<Language>("languages");
                var language = new Language {
                    Description = "en"
                };
                col.Insert(language);
                col.EnsureIndex(x => x.Description);
            }
            return "";
        }

        public static string UpdateLiteDB() {
            using(var db = new LiteDatabase(@"D:\Downloads\MyData.db.light")) {
                var languages = db.GetCollection<Language>("languages");
                var result = languages.FindOne(x => x.Description == "de");
                if (result != null) {
                    result.Description = "el";
                }
                languages.Update(result);
            };
            return "";
        }

        public static string ReadFromLiteDB() {
            try {
                using(var sReader = new StreamReader("D:\\Downloads\\lang.txt")) {
                    string language = sReader.ReadToEnd();
                    return language;
                }
            } catch (IOException) {
                return "en";
            }
        }
    }

}