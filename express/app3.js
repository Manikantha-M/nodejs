// Express Application example

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './staticfiles')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './htmlfiles/index1.html'));
});

app.all('*', (req, res)=>{
    res.status(404).send(`<h1>resource not found</h1>`);
})
app.listen(5000, ()=>console.log('server listening on 5000'));
