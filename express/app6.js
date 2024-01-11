/*
JSON Basics and Path Parameters and Query Parameters

Path Parameters:

Usage: Path parameters are part of the URL path itself.
Syntax: They are specified in the URL path by placing a placeholder in the path, often denoted by a colon (:) followed by the parameter name.
Example: /users/:userId
Usage Case: Path parameters are typically used to identify a specific resource or entity in the URL. For example, in the URL /users/123, 123 is a path parameter representing the userId.

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  // Handle the request based on the userId
});


Query Parameters:

Usage: Query parameters are appended to the end of the URL after a question mark (?), separated by ampersands (&).
Syntax: They are specified as key-value pairs, such as ?name=value.
Example: /search?query=node&category=programming
Usage Case: Query parameters are often used for filtering, sorting, or providing additional options to the server. They don't directly identify a resource like path parameters.

app.get('/search', (req, res) => {
  const query = req.query.query;
  const category = req.query.category;
  // Handle the search based on the query and category
});

*/

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

app.get('/api/products/:id/reviews/:rid', (req, res) => {
    console.log(req.params);
    res.send('Hello world')
})

app.listen(5000, () => {
    console.log('Server is listening on 5000');
})