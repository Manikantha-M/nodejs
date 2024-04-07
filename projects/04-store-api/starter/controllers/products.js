const Product = require('../models/product');

const getAllProducts = async(req, res) => {
    const {featured, company, name, sort, fields} = req.query;
    const queryObj = {};
    queryObj.featured = featured == 'true';
    if(company) queryObj.company = company;
    if(name) queryObj.name = {$regex: name, $options:'i'}
    console.log(queryObj)
   let result = Product.find(queryObj);
   if(sort){
    const sortStr = sort.split(',').join(' ');
    result = result.sort(sortStr);
   }
   if(fields) {
    const fieldsStr = fields.split(',').join(' ');
    result = result.select(fieldsStr);
}

   const products = await result;

   res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProducts}