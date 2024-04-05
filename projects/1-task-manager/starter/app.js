const express = require('express');
const app = express();
const taskRouter = require('./router/tasks-router');
const connectDB = require('./mongoDB/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middleware
app.use(express.json());
app.use(express.static('./public'));

// routes
app.get('/hello', (req, res)=>{
    res.send('Task Manager App');
})

app.use('/api/v1/tasks', taskRouter)
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('connected to the database');
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}
startServer();
