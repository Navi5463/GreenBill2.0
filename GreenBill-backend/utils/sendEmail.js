const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      },
      tls: { rejectUnauthorized: false }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: `<p>${text}</p>`
    });

    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Email sending failed:', err);
    throw err;
  }
};

module.exports = sendEmail;
