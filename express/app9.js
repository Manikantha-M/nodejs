// HTTP GET, POST, PUT
const express = require('express');
const path = require('path');
const app = express();
let { people } = require('./data');

app.use(express.static(path.resolve(__dirname, './staticfiles/http-methods-public')));

// Middleware to parse form data
app.use(express.urlencoded({extended:false}));
/*
This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser. The parsed body is attached to the request object.
*/


// Middleware to parse json
app.use(express.json());
/*
This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. The parsed body is attached to the request object.
*/


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
    res.status(200).json({success:true, person:req.body.name});
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = people.find(p => p.id == parseInt(id));
    if(!user) res.status(200).json({success: false, msg: 'User not found'});
    else {
        user.name = name;
        res.status(200).json({success: true, data: people})
    }
})

app.listen(5000)