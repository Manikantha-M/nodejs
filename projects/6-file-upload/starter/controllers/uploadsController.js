const ProductSchema = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');

const uploadProductImage = async (req, res) => {
    if(!req.files){
        throw new CustomError.BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please Upload Image');
    }
    if(productImage.size > 1024*1024){
        throw new CustomError.BadRequestError('Please upload image smaller than 1KB');
    }
    console.log(req);
    const product = await ProductSchema.create({...req.body, path:`/uploads/${productImage.name}`});
    const uploadPath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(uploadPath);
    res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}});
}

module.exports = {
    uploadProductImage
};