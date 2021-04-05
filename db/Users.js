const mongoose = require('./index');

const UserSchema = mongoose.Schema({
  // _id: {
  //   type: Number,
  //   unique: true
  // },
  username: {
    type: String,
    // no emails can keep users unique not username
    notNull: true,
  },
  email: {
    type: String,
    notNull: true,
    unique: true
  },
  password: {
    type: String,
    notNull: true,
  }
});

const User = mongoose.model('User', UserSchema);

const saveUser = () => {};
const updateUser = () => {};
const getUser = () => {};
const deleteUser = () => {};
const findLast = () => {};

module.exports = { saveUser, updateUser, getUser, deleteUser, findLast };