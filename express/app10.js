// Express Router
const express = require('express');
const app = express();
const peopleRouter = require('./router/people');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/people', peopleRouter)

app.listen(5000)