const nodemailer = require('nodemailer');
const sendEmail = async(to, subject, html) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ernestina.zboncak90@ethereal.email',
        pass: 'mFsvgrAKNta2hsNbBv'
    }
    });

  const info = await transporter.sendMail({
    from: '"ernestina zboncak" <ernestina.zboncak90@ethereal.email>',
    to,
    subject,
    text: "Please verifiy your email", // Plain-text version of the message
    html: "<b>Please verifiy your email</b>", // HTML version of the message
  });

  console.log("Message sent:", info.messageId);

};
module.exports = sendEmail;