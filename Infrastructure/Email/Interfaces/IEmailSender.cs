namespace Transfers {

    public interface IEmailSender {

        SendEmailResponse SendFirstLoginCredentials(FirstLoginCredentialsViewModel model, string loginLink,string language);

        SendEmailResponse SendResetPasswordEmail(string displayName, string userEmail, string callbackUrl, string language);

    }

}