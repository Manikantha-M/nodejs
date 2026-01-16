const {createJWT, isTokenValid, attachCookiesToResponse} = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkPermission = require('./checkPermission');
const sendVerificationEmail = require('./sendVerificationEmail');
const sendResetPWDEmail = require('./sendResetPWDEmail');
const createHash = require('./hashToken');
module.exports = {
    createJWT, isTokenValid, attachCookiesToResponse,createTokenUser, checkPermission, 
    sendVerificationEmail, 
    sendResetPWDEmail, createHash
}