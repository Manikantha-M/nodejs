const Product = require('../models/product');

const getAllProducts = async(req, res) => {
    const {featured, company, name} = req.query;
    const queryObj = {};
    queryObj.featured = featured == 'true';
    if(company) queryObj.company = company;
    if(name) queryObj.name = {$regex: name, $options:'i'}
    console.log(queryObj)
   const products = await Product.find(queryObj);
   res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProducts}