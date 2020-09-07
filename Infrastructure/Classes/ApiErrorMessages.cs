using System;
using System.Collections.Generic;
using System.IO;

namespace Transfers {

    public class ApiErrorMessages {

        private readonly ProductService productService;

        public ApiErrorMessages(ProductService productService) {
            this.productService = productService;
        }

        private static Dictionary<string, string> messages = new Dictionary<string, string>() { };

        public static string RecordNotFound() {
            return GetMessage("RecordNotFound");
        }
        public static string InvalidId() { return GetMessage("InvalidId"); }
        public static string RecordInUse() { return GetMessage("RecordInUse"); }
        public static string AccountNotConfirmed() { return GetMessage("AccountNotConfirmed"); }
        public static string EmailNotFound(string email) { return GetMessage("EmailNotFound"); }
        public static string AuthenticationFailed() { return GetMessage("AuthenticationFailed"); }
        public static string UserNotFound() { return GetMessage("UserNotFound"); }
        public static string DefaultDriverAlreadyExists(string defaultDriver) { return GetMessage("DefaultDriverAlreadyExists"); }

        private static string GetMessage(string lookupKey) {
            return "";
            // return messages.FirstOrDefault(x => x.Key == lookupKey).Value;
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

    }

}