using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace Transfers {

    public class SendOutlookEmail : IEmailSender {

        private readonly OutlookSettings settings;

        public SendOutlookEmail(IOptions<OutlookSettings> settings) =>
            this.settings = settings.Value;

        public void SendRegistrationEmail(string userEmail, string displayName, string callbackUrl) {

            using MailMessage mail = new MailMessage();

            mail.From = new MailAddress(settings.From);
            mail.To.Add(userEmail);
            mail.Subject = "Complete your account setup";
            mail.Body = "<h1 style='color: #FE9F36; font-family: Roboto Condensed;'>Hello, " + displayName + "!" + "</h1>";
            mail.Body += "<h2 style='color: #2e6c80;'>Welcome to People Movers.</h2>";
            mail.Body += "<p>Click the following button to confirm your email account.</p>";
            mail.Body += "<div id='button' style='padding: 1rem;'>";
            mail.Body += "<a style='background-color: #57617B; color: #ffffff; border-radius: 5px; padding: 1rem 2rem; text-decoration: none;' href=" + callbackUrl + ">Confirm</a>";
            mail.Body += "</div>";
            mail.Body += "<p>If clicking doesn't work, copy and paste this link:</p>";
            mail.Body += "<p>" + callbackUrl + "</p>";
            mail.Body += "<p style='font-size: 11px; margin: 2rem 0;'>&copy; People Movers " + DateTime.Now.ToString("yyyy") + "</p>";
            mail.IsBodyHtml = true;

            using SmtpClient smtp = new SmtpClient(settings.SmtpClient, settings.Port) {
                UseDefaultCredentials = true,
                Credentials = new NetworkCredential(settings.Username, settings.Password),
                EnableSsl = true
            };

            smtp.Send(mail);

        }

        public SendEmailResponse SendResetPasswordEmail(string displayName, string userEmail, string callbackUrl) {

            using(MailMessage mail = new MailMessage()) {
                mail.From = new MailAddress(settings.From);
                mail.To.Add(userEmail);
                mail.Subject = "Password reset";
                mail.Body = "<h1 style='color: #FE9F36; font-family: Roboto Condensed;'>Hello, " + displayName + "!" + "</h1>";
                mail.Body += "<h2 style='color: #2e6c80;'>You have requested a password reset</h2>";
                mail.Body += "<p>Click the following button to reset your password.</p>";
                mail.Body += "<div id='button' style='padding: 1rem;'>";
                mail.Body += "<a style='background-color: #57617B; color: #ffffff; border-radius: 5px; padding: 1rem 2rem; text-decoration: none;' href=" + callbackUrl + ">Reset password</a>";
                mail.Body += "</div>";
                mail.Body += "<p>If clicking doesn't work, copy and paste this link:</p>";
                mail.Body += "<p>" + callbackUrl + "</p>";
                mail.Body += "<p style='font-size: 11px; margin: 2rem 0;'>&copy; People Movers " + DateTime.Now.ToString("yyyy") + "</p>";
                mail.IsBodyHtml = true;

                using SmtpClient smtp = new SmtpClient(settings.SmtpClient, settings.Port) {
                    UseDefaultCredentials = true,
                    Credentials = new NetworkCredential(settings.Username, settings.Password),
                    EnableSsl = true
                };

                smtp.Send(mail);

                return new SendEmailResponse();

            }

        }

    }

}