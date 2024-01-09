// Express basics
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.status(200).send('Home page')
})
app.all('*', (req, res) => {
    res.status(404).send(`<h1>resource not found</h1>`);
})


app.listen(5000, () => console.log('server listening on port 5000'));
