const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User')
const {BadRequestError} = require('../errors');

const register = async (req, res) => {
    const user = await UserModel.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({token, user:user.getName()});
    
}
const login = async (req, res) => {
    res.send('login user')
}

module.exports = {register, login}