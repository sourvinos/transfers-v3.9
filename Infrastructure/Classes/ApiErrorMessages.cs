using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace Transfers {

    public class ApiErrorMessages {

        static ApiErrorMessages() {
            GetLanguageMessages(GetLanguageFromFile());
        }

        private static Dictionary<string, string> messages = new Dictionary<string, string>() { };

        public static string RecordNotFound() { return GetMessage("RecordNotFound"); }
        public static string InvalidId() { return GetMessage("InvalidId"); }
        public static string RecordInUse() { return GetMessage("RecordInUse"); }
        public static string AccountNotConfirmed() { return GetMessage("AccountNotConfirmed"); }
        public static string EmailNotFound(string email) { return GetMessage("EmailNotFound"); }
        public static string AuthenticationFailed() { return GetMessage("AuthenticationFailed"); }
        public static string UserNotFound() { return GetMessage("UserNotFound"); }
        public static string DefaultDriverAlreadyExists(string defaultDriver) { return GetMessage("DefaultDriverAlreadyExists"); }

        private static string GetMessage(string lookupKey) {
            return messages.FirstOrDefault(x => x.Key == lookupKey).Value;
        }

        private static string GetLanguageFromFile() {
            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            try {
                using(var sReader = new StreamReader(homeDir + "\\language.txt")) {
                    string language = sReader.ReadToEnd();
                    return language.ToString();
                }
            } catch (IOException) {
                using(var sWriter = new StreamWriter(homeDir + "\\language.txt")) {
                    sWriter.WriteLine("en");
                    return "en";
                }
            }
        }

        private static void GetLanguageMessages(string language) {
            var jsonString = File.ReadAllText("E:\\messages." + language + ".json");
            var welcome = JsonConvert.DeserializeObject<List<Message>>(jsonString);
            messages.Clear();
            foreach (var item in welcome) {
                messages.Add(item.Key, item.Value);
            }
        }

    }

}