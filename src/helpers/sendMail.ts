const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,       // your email address
    pass: process.env.EMAIL_PASS,       // app password (not your login password)
  },
});

async function sendOtpEmail(toEmail, otp) {
  const mailOptions = {
    from: `"AgentVerse" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code',
    html: `
      <h3>Your OTP is: <strong>${otp}</strong></h3>
      <p>This code is valid for 3 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

async function sendResetPasswordEmail(toEmail, token) {
  const resetLink = `${process.env.DOMAIN}/forgetpassword/${token}`;
  const mailOptions = {
    from: `"AgentVerse" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your Reset Password Link to reset AgentVerse Password',
    html: `
      <h3>Click Here to Reset Password: 
      <strong>
        <a href=${resetLink}>
          Reset Password
        </a>
      </strong>
      </h3>
      <p>This Link is valid for 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);

    console.log(`Reset password Mail send to ${resetLink}`);
    return true;
  } catch (error) {
    console.error('Error sending Reset Password email:', error);
    return false;
  }
}

export  {sendOtpEmail,sendResetPasswordEmail}
