// Express Router
const express = require('express');
const app = express();
const peopleRouter = require('./router/people');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/people', peopleRouter)

app.post('/login', (req, res)=>{
    const {name} = req.body;
    if(name)return res.status(200).send(`Welcome ${name}`);
    res.status(401).send('Please Provide credentials');
})

app.listen(5000)