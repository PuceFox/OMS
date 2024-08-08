const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "79f807001@smtp-brevo.com",
    pass: "PrdL4COMcgszbZRY",
  },
});

const sendMail = async (content, targetEmail, subject) => {
  try {
    await transporter.sendMail({
      from: "<zakyabdurrahman10@gmail.com>",
      to: targetEmail,
      subject: subject,
      text: "details",
      html: content,
    });
  } catch (error) {
    console.log(error);
  }

  /*
      try {
        const info = await transporter.sendMail({
          from: "<zakyabdurrahman10@gmail.com>",
          to: "yoel.kristiadi.20@gmail.com",
          subject: "Business Dealing",
          text: "HAHA MAMPUS",
          html: "<b>Hello world?</b>",
        });
      } catch (error) {
        console.log(error);
      }
        */
};

module.exports = {
  transporter,
  sendMail,
};
