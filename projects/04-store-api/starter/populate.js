require('dotenv').config();
const {connectToDatabase} = require('./db/connect');
const ProductModel = require('./models/product');
const jsonProducts = require('./products.json');

const start = async ()=>{
    try {
        await connectToDatabase(process.env.MONGO_URI);
        console.log('connected to the database')
        await ProductModel.deleteMany();
        await ProductModel.create(jsonProducts);
    } catch (error) {
        console.log(error);
    }
}

start();