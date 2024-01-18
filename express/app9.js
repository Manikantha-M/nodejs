// HTTP GET and POST
const express = require('express');
const path = require('path');
const app = express();
let { people } = require('./data');

app.use(express.static(path.resolve(__dirname, './staticfiles/http-methods-public')));

// Middleware to parse form data
app.use(express.urlencoded({extended:false}));
// Middleware to parse json
app.use(express.json());

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
});

app.post('/login', (req, res)=>{
    const {name} = req.body;
    if(name)return res.status(200).send(`Welcome ${name}`);
    res.status(401).send('Please Provide credentials');
})

app.post('/api/people', (req, res)=>{
    console.log(req.body)
    res.status(201).json({success:true, person:req.body.name});
})

app.listen(5000)