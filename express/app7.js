/*
Middleware

In the context of Node.js, middleware refers to a function or a series of functions that have access to the request and response objects in an HTTP application. These functions can modify these objects, perform additional tasks, or terminate the request-response cycle.
Middleware functions also have access to the next function. The next function is a callback that, when invoked, passes control to the next middleware in the stack.
*/ 

const express = require('express');
const app = express();

const logger = (req, res, next) => {
    console.log(req.method, req.url);
    // res.send('Middleware sends response');
    next();
}

app.get('/', logger, (req, res)=>{
    res.send('Home')
})

app.listen(5000);