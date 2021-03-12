const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.send('<h1>Dear, Jake just so you know... you rock!</h1>');
});

app.listen(3000, () => console.log('listening on 3000'));
