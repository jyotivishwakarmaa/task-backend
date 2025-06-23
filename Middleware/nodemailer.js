const nodemailer = require("nodemailer");

const nodeMailer = async (name, toEmail, password) => {
  if (!toEmail) throw new Error("Recipient email is not defined");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vishwakarmajyoti65@gmail.com",
      pass: "scgq adnv xnyo ltba",
    },
  });

  const mailOptions = {
    from: "vishwakarmajyoti65@gmail.com",
    to: toEmail,
    subject: "Welcome to Task Manager",
    text: `Hello ${name},\nYour password is: ${password}`,
  };


  return transporter.sendMail(mailOptions);
};

module.exports = nodeMailer;
