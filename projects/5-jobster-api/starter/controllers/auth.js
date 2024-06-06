const {StatusCodes} = require('http-status-codes');
const UserModel = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors');

const register = async (req, res) => {
    const user = await UserModel.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({token, user:{email:user.email, lastName:user.lastName, location:user.location, name:user.getName()}});
}
const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide valid credentials');
    }
    const user = await UserModel.findOne({email});

    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // compare password
    const isPasswordCorrect = await user.comparePassword(password);
    console.log(isPasswordCorrect, 'ispasswordcorrect');
    if(!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({token, user:{email:user.email, lastName:user.lastName, location:user.location, name:user.getName()}})

}
const updateUser = async (req, res) => {
    console.log(req.user);
    console.log(req.body);
}
module.exports = {register, login, updateUser}