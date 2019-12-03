const express = require('express');
const app = express();
const PORT = process.env.PORT;

require('dotenv').config();

const db = require('./models');

app.listen(PORT, 
  () => console.log(`ISSSAAALLLIVVVEE @ ${PORT}`));