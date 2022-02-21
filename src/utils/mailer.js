const chalk = require("chalk");
const nodemailer = require("nodemailer");
const debug = require("debug")("app:mailservice");

const config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const accountsMail = {
  from: process.env.EMAIL,
  subject: "Robots account activation",
};

const sendEmail = (mail = {}) => {
  const emailToSend = { ...accountsMail, ...mail };

  transporter.sendMail(emailToSend, (error) => {
    if (error) {
      debug(
        chalk.redBright(
          `Error while sending activation email to ${emailToSend.to}`
        )
      );
      return;
    }
    debug(chalk.yellowBright(`Activation email sent to ${emailToSend.to}`));
  });
};

module.exports = sendEmail;
