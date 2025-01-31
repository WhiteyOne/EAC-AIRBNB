const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');


// isProduction will be true if the environment is in 
// production or not by checking the environment key in the 
// configuration file (backend/config/index.js):
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

//middleware for logging information
app.use(morgan('dev'));

//cookie-parser middleware for cookies and express.json
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

const routes = require('./routes');

app.use(routes); // Connect all the routes

module.exports = app;
