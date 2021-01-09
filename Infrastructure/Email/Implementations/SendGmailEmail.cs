using System;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Transfers {

    public class SendGmailEmail : IEmailSender {

        private readonly GmailSettings settings;

        public SendGmailEmail(IOptions<GmailSettings> settings) {
            this.settings = settings.Value;
        }

        public SendEmailResponse SendFirstLoginCredentials(FirstLoginCredentialsViewModel model, string loginLink) {

            var message = new MimeMessage();

            var htmlContent = "";

            htmlContent += "<h2>Hello, " + model.DisplayName + "!" + "</h2>";
            htmlContent += "<p>Use these credentials to login:</p>";
            htmlContent += "<p>Username: " + model.UserName + "</p>";
            htmlContent += "<p>Password: " + model.OneTimePassword + "</p>";
            htmlContent += "<p>Warning</p>";
            htmlContent += "<p>This password is temporary and can be used only once.</p>";
            htmlContent += "<p>You must change it immediately after your first successful login.</p>";
            htmlContent += "<a href=" + loginLink + ">Login</a>";
            htmlContent += "<p>We wish you a pleasant experience using our application.</p>";
            htmlContent += "<br>";
            htmlContent += "<p>Regards,</p>";
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

        public SendEmailResponse SendResetPasswordEmail(string displayName, string userEmail, string callbackUrl) {

            var message = new MimeMessage();

            var htmlContent = "";

            htmlContent += "<h2>Hello, " + displayName + "!" + "</h2>";
            htmlContent += "<p>You have requested a password reset.</p>";
            htmlContent += "<p>Click the following button to set a new password</p>";
            htmlContent += "<a href=" + callbackUrl + ">Reset password</a>";
            htmlContent += "<p>Thank you for using our application.</p>";
            htmlContent += "<br>";
            htmlContent += "<p>Regards,</p>";
            htmlContent += "<p>&copy; Island Cruises " + DateTime.Now.ToString("yyyy") + "</p>";

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