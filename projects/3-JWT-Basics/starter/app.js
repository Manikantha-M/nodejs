/*
JWT
JSON Web Token(JWT) is a way for securely transmitting information between parties as a JSON object.
Usage of JWT: Authorization, Information Exchange
JWT structure:
JWT consist of three parts separated by dots(.), whichh are:
Header.Payload.Signature
The output is three Base64-URL strings separated by dots.

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema.
*/



require('dotenv').config();
require('express-async-errors');
const mainRouter = require('./routes/main');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
