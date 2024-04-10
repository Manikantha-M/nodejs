require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const authenticateUser = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Connect DB
const {connectToDatabase} = require('./db/connect');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const startServer = async()=>{
    try {
        const connection = await connectToDatabase(process.env.MONGO_URI);
        if(connection){
          console.log('connected to the database');
          app.listen(port, console.log(`server is listening on port ${port}`));
        }
    } catch (error) {
        console.log(error);
    }
}
startServer();