using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Newtonsoft.Json;

namespace Transfers {

    partial class Welcome {

        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("value")]
        public string Value { get; set; }

    }

    // These are returned "as-they-are" to the front-end in case of an error

    public static class ApiErrorMessages {

        private static Dictionary<string, string> messages = new Dictionary<string, string>() { { "RecordNotFound", "This record was not found." }, { "InvalidId", "Given Id and actual Id do not match." }, { "RecordInUse", "Record is in use and can not be deleted." }, { "AccountNotConfirmed", "This account is pending email confirmation." }, { "EmailNotFound", "This email was not found." }, { "AuthenticationFailed", "Authentication failed." }, { "UserNotFound", "This user was not found." }, { "DefaultDriverAlreadyExists", "There is already a default driver." } };

        public static string RecordNotFound() { return GetMessage("RecordNotFound"); }
        public static string InvalidId() { return GetMessage("InvalidId"); }
        public static string RecordInUse() { return GetMessage("RecordInUse"); }
        public static string AccountNotConfirmed() { return GetMessage("AccountNotConfirmed"); }
        public static string EmailNotFound(string email) { return GetMessage("EmailNotFound"); }
        public static string AuthenticationFailed() { return OpenLanguageFile(); }
        public static string UserNotFound() { return GetMessage("UserNotFound"); }
        public static string DefaultDriverAlreadyExists(string defaultDriver) { return GetMessage("DefaultDriverAlreadyExists"); }

        private static string GetMessage(string lookupKey) {
            return messages.FirstOrDefault(x => x.Key == lookupKey).Value;
        }

        private static string GetLanguageFromFile() {
            try {
                using(var sReader = new StreamReader("D:\\Downloads\\lang.txt")) {
                    string language = sReader.ReadToEnd();
                    return language;
                }
            } catch (IOException) {
                return "en";
            }
        }

        private static string OpenLanguageFile() {
            var jsonString = File.ReadAllText("D:\\Downloads\\messages.en.json");
            var welcome = JsonConvert.DeserializeObject<List<Welcome>>(jsonString);
            System.Console.Write(welcome);
            return "Test auth failure";
        }

    }

}