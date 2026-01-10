const UserSchema = require('../model/user-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse,createTokenUser} = require('../utils');
const { options } = require('joi');
const crypto = require('crypto');


const register = async (req, res) => {
    const { email, name, password } = req.body;
    const emailAlreadyExists = await UserSchema.findOne({email});
    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    // First registered user is an Admin
    const isFirstAccount = (await UserSchema.countDocuments({})) == 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await UserSchema.create({ email, name, password, role, verificationToken });
    
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser});

    // res.status(StatusCodes.CREATED).json({ user: tokenUser });
    res.status(StatusCodes.CREATED).json({ msg: 'Success! Please check your email to verifiy account', verificationToken });
};

const verifyEmail = async (req,res) => {
    const {verificationToken, email} = req.body;
    res.status(StatusCodes.OK).json({verificationToken, email});
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
    if(!user.isVerified){
        throw new CustomError.UnauthenticatedError('Please verify your email');
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser});

    res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
   res.cookie('token', 'logout', {
    httpOnly:true,
    expires: new Date(Date.now() + 5*1000)
});
res.status(StatusCodes.OK).json({"msg":"user logged out"});
};

module.exports = {
    register, login, logout, verifyEmail
}