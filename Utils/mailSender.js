import nodemailer from "nodemailer";
export const mailSender = async (options) => {
  try {
    // ✅ إعداد النقل باستخدام nodemailer مع Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST || "smtp.gmail.com",
      port: Number(process.env.SMPT_PORT) || 465,
      secure: true, // استخدام SSL
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.to,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};


