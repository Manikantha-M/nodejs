// Multiple middlewares
const express = require('express');
const app = express();
const authorize = require('./middlewares/authorize');
const logger = require('./middlewares/logger');
const morgan = require('morgan');

app.use(morgan('tiny'))
// app.use([authorize, logger])
// app.get('/', [authorize, logger], (req, res) => {
//     console.log(req.user)
//     res.send('Home');
// })
app.get('/', (req, res) => {
    // console.log(req.user)
    res.send('Home');
})

app.listen(5000)