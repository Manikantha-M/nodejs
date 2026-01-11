const UserSchema = require('../model/user-model');
const TokenSchema = require('../model/token-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse,createTokenUser} = require('../utils');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmal');

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
    
    const tokenUser = createTokenUser(user);
    // Create Refresh Token
    let refreshToken = '';
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = {refreshToken, ip, userAgent, user:user._id};
    await TokenSchema.create(userToken);
    // attachCookiesToResponse({res, user: tokenUser});
    sendEmail("test@example.com", "Please verify your email");
    // res.status(StatusCodes.CREATED).json({ user: tokenUser });
    res.status(StatusCodes.CREATED).json({ msg: 'Success! Please check your email to verifiy account', verificationToken });
};

const verifyEmail = async (req,res) => {
    const {verificationToken, email} = req.body;
    const user = await UserSchema.findOne({email});
    if(!user){
        throw new CustomError.UnauthenticatedError('Verification Failed');
    };
    if(user.verificationToken !== verificationToken){
        throw new CustomError.UnauthenticatedError('Verification Failed');
    };
    await UserSchema.findOneAndUpdate({_id:user._id}, {isVerified:true, verified:Date.now(), verificationToken:''})
    res.status(StatusCodes.OK).json({msg:'email verified'});
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
     let refreshToken = '';
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = {refreshToken, ip, userAgent, user:user._id};
    await TokenSchema.create(userToken);
    attachCookiesToResponse({res, user: tokenUser, refreshToken});

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