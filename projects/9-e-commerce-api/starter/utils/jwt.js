const jwt = require('jsonwebtoken');

const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME});
    return token;
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({res, user, refreshToken}) => {
    const token = createJWT({payload:{user}});
    let refreshTokenJWT = createJWT({payload:{user, refreshToken}});
    const oneDay = 1000*60*60*24;
    res.cookie('accessToken', token, {
        httpOnly: true,
        // expires:new Date(Date.now()+oneDay),
        secure: process.env.NODE_ENV === 'prod',
        signed: true,
        maxAge:1000
    });
    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires:new Date(Date.now()+oneDay),
        secure: process.env.NODE_ENV === 'prod',
        signed: true
    });
}
module.exports = {
    createJWT, isTokenValid, attachCookiesToResponse
}