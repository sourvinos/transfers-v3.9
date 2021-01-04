using System;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Transfers {

    public class SendGmailEmail : IEmailSender {

        private readonly GmailSettings settings;

        public SendGmailEmail(IOptions<GmailSettings> settings) =>
            this.settings = settings.Value;

        public void SendRegistrationEmail(string userEmail, string displayName, string callbackUrl) {

            var message = new MimeMessage();

            var htmlContent = "<h1 style='color: #FE9F36;'>Hello, " + displayName + "!" + "</h1>";

            htmlContent += "<h2 style='color: #2e6c80;'>Complete your account setup.</h2>";
            htmlContent += "<p>Click the following button to complete your account setup</p>";
            htmlContent += "<div id='button' style='padding: 1rem;'>";
            htmlContent += "<a style='background-color: #57617B; color: #ffffff; border-radius: 0.6875rem; padding: 1rem 2rem; text-decoration: none;' href=" + callbackUrl + ">Complete account setup</a>";
            htmlContent += "</div>";
            htmlContent += "<p>If clicking doesn't work, copy and paste this link:</p>";
            htmlContent += "<p>" + callbackUrl + "</p>";
            htmlContent += "<p style='font-size: 0.6875rem; margin: 2rem 0;'>&copy; Island Cruises " + DateTime.Now.ToString("yyyy") + "</p>";

            message.From.Add(new MailboxAddress(settings.From, settings.Username));
            message.To.Add(new MailboxAddress(displayName, userEmail));
            message.Subject = displayName + ", complete your account setup";
            message.Body = new TextPart("html") {
                Text = htmlContent
            };

            using (var client = new MailKit.Net.Smtp.SmtpClient()) {
                client.Connect(settings.SmtpClient, settings.Port, false);
                client.Authenticate(settings.Username, settings.Password);
                client.Send(message);
                client.Disconnect(true);
            }

        }

        public SendEmailResponse SendResetPasswordEmail(string displayName, string userEmail, string callbackUrl) {

            var message = new MimeMessage();

            var htmlContent = "<h1 style='color: #FE9F36;'>Hello, " + displayName + "!" + "</h1>";

            htmlContent += "<h2 style='color: #2e6c80;'>You have requested a password reset.</h2>";
            htmlContent += "<p>Click the following button to reset your password</p>";
            htmlContent += "<div id='button' style='padding: 1rem;'>";
            htmlContent += "<a style='background-color: #57617B; color: #ffffff; border-radius: 0.6875rem; padding: 1rem 2rem; text-decoration: none;' href=" + callbackUrl + ">Reset password</a>";
            htmlContent += "</div>";
            htmlContent += "<p>If clicking doesn't work, copy and paste this link:</p>";
            htmlContent += "<p>" + callbackUrl + "</p>";
            htmlContent += "<p style='font-size: 0.6875rem; margin: 2rem 0;'>&copy; Island Cruises " + DateTime.Now.ToString("yyyy") + "</p>";

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