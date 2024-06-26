const {StatusCodes} = require('http-status-codes');
const UserSchema = require('../model/user-model');
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
    const users = await UserSchema.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({users});
}

const getSingleUser = async (req, res) => {
    const user = await UserSchema.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`No user with id:${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({user});
}

const showCurrentUser = async (req, res) => {
    res.send('showCurrentUser');
}

const updateUser = async (req, res) => {
    res.send('updateUser');
}

const updateUserPassword = async (req, res) => {
    res.send('updateUserPassword');
}

module.exports = {
    getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword
}