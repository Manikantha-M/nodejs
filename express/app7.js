/*
Middleware

In the context of Node.js, middleware refers to a function or a series of functions that have access to the request and response objects in an HTTP application. These functions can modify these objects, perform additional tasks, or terminate the request-response cycle.
Middleware functions also have access to the next function. The next function is a callback that, when invoked, passes control to the next middleware in the stack.
*/ 

const express = require('express');
const app = express();
const logger = require('./middlewares/logger');

// const logger = (req, res, next) => {
//     console.log(req.method, req.url);
//     // res.send('Middleware sends response');
//     next();
// }

// app.get('/', logger, (req, res)=>{
//     res.send('Home')
// })

// app.use(logger);
// The middleware applies to all routes
app.use('/api', logger);
// The middleware applies to all routes that starts with /api only.

app.get('/', (req, res)=>{
    res.send('Home')
})

app.get('/api/products', (req, res)=>{
    res.send('products')
})

app.get('/api/items', (req, res)=>{
    res.send('items')
})

app.listen(5000);