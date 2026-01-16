const UserSchema = require('../model/user-model');
const TokenSchema = require('../model/token-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse,createTokenUser} = require('../utils');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmal');
const {sendResetPWDEmail, sendVerificationEmail, createHash} = require('../utils');

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
    sendEmail({to:email, subject:"register", text:"registred", html:`<h4>hi</h4>`});
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
     // check for existing token
    const existingToken = await TokenSchema.findOne({user:user._id});
    if(existingToken){
        const {isValid} = existingToken;
        if(!isValid){
            throw new CustomError.UnauthenticatedError('Invalid credentials');
        };
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({res, user: tokenUser, refreshToken});

        res.status(StatusCodes.OK).json({ user: tokenUser });
        return
    }
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = {refreshToken, ip, userAgent, user:user._id};
    await TokenSchema.create(userToken);
    attachCookiesToResponse({res, user: tokenUser, refreshToken});

    res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
    await TokenSchema.findOneAndDelete({user: req.user.userId});
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() )
    });
    res.status(StatusCodes.OK).json({"msg":"user logged out"});
};

const forgotPassword = async (req, res)=>{
    const {email} = req.body;
    if(!email){
        throw new CustomError.BadRequestError('Please provide valid email');
    };
    const user = await UserSchema.findOne({email});
    if(user){
        const passwordToken = crypto.randomBytes(70).toString('hex');
        // send email
        const origin = 'http://localhost:3000';
        await sendResetPWDEmail({name:user.name, email:user.email,token:passwordToken, origin })
        const tenMinutes = 1000*60*10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();
    }
    res.status(StatusCodes.OK).json({msg:"please check your email for reset password link"});
};
const resetPassword = async (req, res)=>{
    const {token, email, password} = req.body;
    if(!token || !email || !password){
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await UserSchema.findOne({email});
    if(user){
        const currentDate = new Date();
        if(user.passwordToken === createHash(token) && user.passwordTokenExpirationDate > currentDate){
            user.password = password;
            user.passwordToken = null;
            user.passwordTokenExpirationDate= null;
            await user.save();
        }else{
            throw new CustomError.BadRequestError('invalid credential');
        }
    }else{
        throw new CustomError.BadRequestError('invalid credential');
    }
    res.status(StatusCodes.OK).json({user})
}

module.exports = {
    register, login, logout, verifyEmail, forgotPassword, resetPassword
}