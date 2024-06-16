const ProductSchema = require('../models/Product');
const {StatusCodes} = require('http-status-codes');

const createProduct = async (req, res) => {
    console.log(req.body)
    const product = await ProductSchema.create(req.body);

    res.status(StatusCodes.CREATED).send('create product/get all products');
}
const getAllProducts = async (req, res) => {
    const products = await ProductSchema.find({});
    res.status(StatusCodes.OK).json({products});
}

module.exports = {
    createProduct, getAllProducts
};