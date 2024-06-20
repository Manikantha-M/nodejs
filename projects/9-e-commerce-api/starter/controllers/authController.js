const UserSchema = require('../model/user-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {createJWT} = require('../utils');


const register = async (req, res) => {
    const { email, name, password } = req.body;
    const emailAlreadyExists = await UserSchema.findOne({email});
    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    // First registered user is an Admin
    const isFirstAccount = (await UserSchema.countDocuments({})) == 0;
    const role = isFirstAccount ? 'admin' : 'user'
    const user = await UserSchema.create({ email, name, password, role });
    
    const tokenUser = {name:user.name, userId:user._id, role:user.role}; 
    const token = createJWT({payload:tokenUser})
    
    res.status(StatusCodes.CREATED).json({ user:tokenUser, token });
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