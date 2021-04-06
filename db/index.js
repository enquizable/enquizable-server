const mongoose = require('mongoose');
const databaseName = 'enquizable';

mongoose.connect(`mongodb://127.0.0.1/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;
