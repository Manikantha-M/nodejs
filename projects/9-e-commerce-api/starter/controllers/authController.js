const UserSchema = require('../model/user-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse} = require('../utils');


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
    attachCookiesToResponse({res, user: tokenUser});

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){ throw new CustomError.BadRequestError('Please provide email and password');
    };

    const user = await UserSchema.findOne({email});
    if(!user) {
        throw new CustomError.UnauthenticatedError('Invalid credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid credentials');
    };
    const tokenUser = {name:user.name, userId:user._id, role:user.role};
    attachCookiesToResponse({res, user: tokenUser});

    res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
    res.send('logout user')
};

module.exports = {
    register, login, logout
}