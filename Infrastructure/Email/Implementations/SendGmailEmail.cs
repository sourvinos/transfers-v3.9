using System;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Transfers {

    public class SendGmailEmail : IEmailSender {

        private readonly GmailSettings settings;

        public SendGmailEmail(IOptions<GmailSettings> settings) {
            this.settings = settings.Value;
        }

        public SendEmailResponse SendFirstLoginCredentials(FirstLoginCredentialsViewModel model, string loginLink, string language) {

            var message = new MimeMessage();

            var htmlContent = "";
            var body = EmailMessages.FirstLoginCredentials(language);

            htmlContent += "<h2 style = 'font-weight: 500;'>" + body[0] + model.DisplayName + "!" + "</h2>";
            htmlContent += "<p>" + body[1] + "</p>";
            htmlContent += "<p>" + body[2] + model.UserName + "</p>";
            htmlContent += "<p>" + body[3] + model.OneTimePassword + "</p>";
            htmlContent += "<br>";
            htmlContent += "<a style = 'color: #ffffff; margin: 1rem; background-color: #55828B; padding: 1rem; border-radius: 5px; text-decoration: none;' href=" + loginLink + ">" + body[7] + "</a>";
            htmlContent += "<br>";
            htmlContent += "<br>";
            htmlContent += "<p>" + body[4] + "</p>";
            htmlContent += "<p>" + body[5] + "</p>";
            htmlContent += "<p>" + body[6] + "</p>";
            htmlContent += "<br>";
            htmlContent += "<br>";
            htmlContent += "<p>" + body[8] + "</p>";
            htmlContent += "<br>";
            htmlContent += "<p>" + body[9] + "</p>";
            htmlContent += "<p>&copy; Island Cruises " + DateTime.Now.ToString("yyyy") + "</p>";

            message.From.Add(new MailboxAddress(settings.From, settings.Username));
            message.To.Add(new MailboxAddress(model.DisplayName, model.Email));
            message.Subject = "Login details";
            message.Body = new TextPart("html") {
                Text = htmlContent
            };

            using (var client = new MailKit.Net.Smtp.SmtpClient()) {
                client.Connect(settings.SmtpClient, settings.Port, false);
                client.Authenticate(settings.Username, settings.Password);
                client.Send(message);
                client.Disconnect(true);
            }

            return new SendEmailResponse();

        }

        public SendEmailResponse SendResetPasswordEmail(string displayName, string userEmail, string callbackUrl, string language) {

            var message = new MimeMessage();

            var htmlContent = "";
            var body = EmailMessages.ResetPassword(language);

            htmlContent += "<h2 style = 'font-weight: 500;'>" + body[0] + displayName + "!" + "</h2>";
            htmlContent += "<p>" + body[1] + "</p>";
            htmlContent += "<p>" + body[2] + "</p>";
            htmlContent += "<br>";
            htmlContent += "<a style = 'color: #ffffff; margin: 1rem; background-color: #55828B; padding: 1rem; border-radius: 5px; text-decoration: none;' href=" + callbackUrl + ">" + body[3] + "</a>";
            htmlContent += "<br>";
            htmlContent += "<br>";
            htmlContent += "<p>" + body[4] + "</p>";
            htmlContent += "<br>";
            htmlContent += "<p>" + body[5] + "</p>";
            htmlContent += "<p>Island Cruises " + DateTime.Now.ToString("yyyy") + "</p>";

            message.From.Add(new MailboxAddress(settings.From, settings.Username));
            message.To.Add(new MailboxAddress(displayName, userEmail));
            message.Subject = "Password reset";
            message.Body = new TextPart("html") {
                Text = htmlContent
            };

            using (var client = new MailKit.Net.Smtp.SmtpClient()) {
                client.Connect(settings.SmtpClient, settings.Port, false);
                client.Authenticate(settings.Username, settings.Password);
                client.Send(message);
                client.Disconnect(true);
            }

            return new SendEmailResponse();

        }

    }

}