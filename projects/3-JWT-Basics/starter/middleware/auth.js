const {UnauthenticatedError} = require("../errors/index");

const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided');
    }
    const token = authHeader.split(' ')[1];

    try {
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decodedJWT;
        req.user = {id, username};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}
module.exports = authMiddleware;