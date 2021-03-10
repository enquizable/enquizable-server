const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.send('<h1>This should be different now</h1>')
});

app.listen(3000, () => console.log('listening on 3000'))