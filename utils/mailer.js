const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const mailer = async (userInfo, code) => {
  console.log(code);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"FluxStore Customers Support" <${process.env.ETHEREAL_USER}>`,
    to: userInfo.email,
    subject: "Reset Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hello ${userInfo.name}!</h2>
        <p style="color: #666;">You have requested to reset your password for FluxStore account.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p style="color: #333; font-size: 18px;">Your verification code is:</p>
          <h3 style="color: #007BFF; margin-top: 10px; margin-bottom: 0;">${code}</h3>
        </div>
        
        <p style="color: #666; margin-top: 20px;">Please enter this code in the app to proceed with the password reset.</p>
        
        <p style="color: #666;">If you didn't request this, you can safely ignore this email.</p>
        
        <p style="color: #666; margin-top: 20px;">Best Regards,<br/>
        FluxStore Customers Support</p>
      </div>
    `
  };
  
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailer;
