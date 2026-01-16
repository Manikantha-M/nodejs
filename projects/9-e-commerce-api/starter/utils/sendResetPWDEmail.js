const sendEmail = require('./sendEmal');
const sendResetPWDEmail = async ({name, email, token, origin})=>{
    const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
    const message = `<p>Please reset password by clicking the following link:
    <a href="${resetURL}">${resetURL}</a></p>`;
    return sendEmail({
        to:email,
        subject: 'Reset password',
        html:`<h4>Hello ${name}</h4>${message}`
    })
};
module.exports = sendResetPWDEmail