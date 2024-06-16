require('dotenv').config();
require('express-async-errors');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})

const express = require('express');
const app = express();

// database
const {connectToDatabase} = require('./db/connect');

// Router
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.static('./public'))
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/products', productRouter);

// middleware
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
