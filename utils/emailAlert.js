const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"SIM Swap Detector" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family:Arial;padding:20px;background:#f4f4f4">
          <h2 style="color:#c0392b">⚠️ SIM Swap Alert</h2>
          <p>${message}</p>
          <p style="color:#888;font-size:12px">SIM Swap Detection System — Kenya</p>
        </div>
      `
    });

    console.log('Email sent to', to);
    return true;
  } catch (err) {
    console.error('Email error:', err.message);
    return false;
  }
};

module.exports = sendEmail;