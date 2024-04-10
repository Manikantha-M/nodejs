const {StatusCodes} = require('http-status-codes');
const UserModel = require('../models/User')
const {BadRequestError} = require('../errors');

const register = async (req, res) => {
    // const {name, email, password} = req.body;
    // if(!name || !email || !password){
    //     throw new BadRequestError('Please provide name, email, and password')
    // }
    const user = await UserModel.create(req.body);
    res.status(StatusCodes.CREATED).json(user)
}
const login = async (req, res) => {
    res.send('login user')
}

module.exports = {register, login}