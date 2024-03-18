const express = require('express');
// const path = require('path');
const app = express();
// let { people } = require('./data');
const peopleRouter = require('./router/people');

// app.use(express.static(path.resolve(__dirname, './staticfiles/http-methods-public')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/people', peopleRouter)

app.post('/login', (req, res)=>{
    const {name} = req.body;
    if(name)return res.status(200).send(`Welcome ${name}`);
    res.status(401).send('Please Provide credentials');
})

app.listen(5000)