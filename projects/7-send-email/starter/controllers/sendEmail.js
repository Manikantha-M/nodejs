const nodemailer = require('nodemailer');

const sendEmail = async (req, res)=> {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let info = await transporter.sendMail({
        from: 'manikanta.iiitnuz@gmail.com',
        to: 'mani@gmail.com',
        subject: 'Hello',
        html: '<h2>Sending Email with Nodejs</h2>'
    })
    res.send(info);
};

module.exports = sendEmail;