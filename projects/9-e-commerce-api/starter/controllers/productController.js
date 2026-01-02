const Product = require('../model/product-model');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {createTokenUser, attachCookiesToResponse, checkPermission} = require('../utils');

const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
};
const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({products});
};
const getSingleProduct = async (req, res) => {
    res.send('getSingleProduct')
};
const updateProduct = async (req, res) => {
    res.send('updateProduct')
};
const deleteProduct = async (req, res) => {
    res.send('deleteProduct')
};
const uploadImage = async (req, res) => {
    res.send('Upload Image')
};
module.exports = {
    createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage
}