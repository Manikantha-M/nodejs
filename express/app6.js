// JSON Basics and Path Params

const express = require('express');
const {products} = require('./data');
const app = express();

app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1><a href="/api/products">products</a>`);
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map(({id, name, image}) => ({id, name, image}));
    res.json(newProducts)
})

app.get('/api/products/:id', (req, res)=> {
    const singleProduct = products.find(prod => req.params.id == prod.id.toString());
    if(!singleProduct) res.status(404).send('Product not found')
    else res.json(singleProduct)
})

app.listen(5000, () => {
    console.log('Server is listening on 5000');
})