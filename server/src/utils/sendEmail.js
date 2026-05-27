const nodemailer =
  require("nodemailer");

const sendEmail = async (
  to,
  subject,
  html
) => {

  try {

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    const mailOptions = {
      from:
        process.env.EMAIL_USER,

      to,

      subject,

      html,
    };

    const info =
      await transporter.sendMail(
        mailOptions
      );

    console.log(
      "EMAIL SENT:",
      info.response
    );

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error
    );

  }
};

module.exports = sendEmail;