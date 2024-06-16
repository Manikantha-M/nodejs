const ProductSchema = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const path = require('path');

const uploadProductImage = async (req, res) => {
    const productImage = req.files.image;
    const uploadPath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(uploadPath);
    res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}});
}

module.exports = {
    uploadProductImage
};