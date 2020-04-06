const nodemailer = require("nodemailer");
const serverEmail = 'knowledgebase.4o.a@gmail.com';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: serverEmail,
    pass: '4OApassword',
  },
});

let sendMail = (sender, emailToSendTo, content) => {
  let subjectEmail = "A message from " + sender + "!";
  let textToSend = content
  let mailOptions = {
    from: serverEmail,
    to: emailToSendTo,
    subject: subjectEmail,
    text: textToSend,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Failed to send email", err);
    } else {
      console.log("email sent: ", info.response);
    }
  });
};

module.exports = {
  sendMail,
};
