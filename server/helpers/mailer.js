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

module.exports = {
  transporter,
};
