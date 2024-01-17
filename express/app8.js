// Multiple middlewares
const express = require('express');
const app = express();
const authorize = require('./middlewares/authorize');
const logger = require('./middlewares/logger')

app.use([authorize, logger])
app.get('/', (req, res) => {
    console.log(req.user)
    res.send('Home');
})

app.listen(5000)