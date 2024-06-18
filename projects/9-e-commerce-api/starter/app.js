require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');

const app = express();
// Connect DB
const { connectToDatabase } = require('./db/connect');
// Auth Router
const authRouter = require('./routes/authRoutes');

// middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.send('E-Commerce API')
})
app.use('/api/v1/auth',authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const connection = await connectToDatabase(process.env.MONGO_URI);
        if (connection) {
            console.log('connected to the database');
            app.listen(port, console.log(`server is listening on port ${port}`));
        }
    } catch (error) {
        console.log(error);
    }
}
startServer();