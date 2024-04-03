const express = require('express');
const app = express();
const taskRouter = require('./router/tasks-router');
require('./mongoDB/connect')

// middleware
app.use(express.json());
// routes
app.get('/hello', (req, res)=>{
    res.send('Task Manager App');
})

app.use('/api/v1/tasks', taskRouter)


const port = 3000;
app.listen(port, console.log('server is listening on port 3000'))

