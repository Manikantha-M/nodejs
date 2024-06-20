const UserSchema = require('../model/user-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const register = async (req, res) => {
    const { email } = req.body;
    const emailAlreadyExists = await UserSchema.findOne({email});
    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    const user = await UserSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ user })
};
const login = async (req, res) => {
    res.send('login user')
};
const logout = async (req, res) => {
    res.send('logout user')
};

module.exports = {
    register, login, logout
}