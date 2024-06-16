const ProductSchema = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
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

const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true, folder: 'file-upload-api'
    });
    res.status(StatusCodes.CREATED).json({image:{src:result.secure_url}});
    fs.unlinkSync(req.files.image.tempFilePath);

}

module.exports = {
    uploadProductImage, uploadProductImageLocal
};