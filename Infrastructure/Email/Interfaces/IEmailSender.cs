using System.Threading.Tasks;

namespace Transfers {

    public interface IEmailSender {

        void SendRegistrationEmail(string userEmail, string displayName, string callbackUrl);
        SendEmailResponse SendResetPasswordEmail(string displayName, string userEmail, string callbackUrl);

    }

}