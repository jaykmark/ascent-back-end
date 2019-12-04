const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Creates sessions
const session = require('express-session');
// Stores session in database
const MongoStore = require('connect-mongo')(session);
// Allows API calls from a front-end with different host
const cors = require('cors');

// Processes .env file. Need to call this before process.env variables.
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');


// --------------- MIDDLEWARE --------------- //
// // Session
// app.use(
//   session({
//     store: new MongoStore({ url: process.env.MONGODB_URI }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom Logger Middleware (credit to Kenny Bushman)
app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;
  const requestedAt = new Date().toLocaleString();
  console.log( `URL:${url} -  METHOD:${method} - AT:${requestedAt}`);
  next();
});

// --------------- ROUTES --------------- //
// Sanity check to see if server is running at route directory.
app.get('/', (req, res) => {
  res.send(`<h1>WAKE UP IT'S TIME TO SIN</h1>`)
});

// Auth routes
app.use('/api/v1/auth', routes.auth);

// Users routes
app.use('/api/v1/users', routes.users);

// Skills routes
app.use('/api/v1/skills', routes.skills);




// --------------- START SERVER --------------- //
app.listen(PORT, 
  () => console.log(`ISSSAAALLLIVVVEE @ ${PORT}`));