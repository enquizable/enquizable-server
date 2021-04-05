const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.send('<h1>Dear, Jake just so you know... you rock!</h1>');
});

module.exports = app;
