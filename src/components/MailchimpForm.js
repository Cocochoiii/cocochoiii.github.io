import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Newsletter } from "./Newsletter";

const postUrl = (process.env.REACT_APP_MAILCHIMP_URL && process.env.REACT_APP_MAILCHIMP_U && process.env.REACT_APP_MAILCHIMP_ID)
  ? `${process.env.REACT_APP_MAILCHIMP_URL}?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`
  : null;

export const MailchimpForm = () => {
  if (!postUrl) return null; // silently hide if not configured

  return (
    <MailchimpSubscribe
      url={postUrl}
      render={({ subscribe, status, message }) => (
        <Newsletter
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};
