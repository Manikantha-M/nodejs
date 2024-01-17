// GET Request
const express = require('express');
const path = require('path');
const app = express();
let { people } = require('./data');

app.use(express.static(path.resolve(__dirname, './staticfiles/methods-public')));

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})

app.listen(5000)