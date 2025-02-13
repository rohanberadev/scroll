import * as React from "react";

type EmailTemplateProps = {
  userId: string;
  username: string;
  verificationLink: string;
};

const UserVerificationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  userId,
  username,
  verificationLink,
}) => (
  <div>
    <h2>Verify Your Email</h2>
    <p>Hi {username},</p>
    <p>Click the link below to verify your email and activate your account:</p>
    <p>
      <a href={verificationLink}>Verify Email</a>
    </p>
    <p>
      If the button {"don't"} work, copy and paste this link into your browser:
    </p>
    <p>{verificationLink}</p>
    <p>If you {"didn't"} request this, you can ignore this email.</p>
    <p>
      Thanks,
      <br />
      The Scroll Team
    </p>
  </div>
);

export default UserVerificationEmail;
