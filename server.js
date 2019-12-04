const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Processes .env file
require('dotenv').config();

require('./models');

app.listen(PORT, 
  () => console.log(`ISSSAAALLLIVVVEE @ ${PORT}`));