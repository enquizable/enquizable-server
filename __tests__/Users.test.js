const mongoose = require('mongoose');
const request = require('supertest');
const databaseName = 'enquizable';
const User = require('../db/Users');
const app = require('../app');


beforeAll(async () => {
  // Connect to mongoDB
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { userNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true });
});

afterAll(() => {
  mongoose.connection.close();
});

describe('POST /users', () => {
  test('It should create a new user', async () => {
    const testUser = {
      username: 'Jon',
      email: 'jon@gmail.com',
      password: '123'
    }
    await request(app)
      .post('/users')
      .send(testUser);
    const createdUser = await User.findLast();
    expect(createdUser.body).toHaveProperty('username');
    expect(createdUser.body).toHaveProperty('email');
    expect(createdUser.body).toHaveProperty('password');
    expect(createdUser.body.username).toBe('Jon');
    expect(createdUser.body.email).toBe('jon@gmail.com');
    expect(createdUser.body.password).toBe('123');
  })
});

describe('GET /users/:id', () => {

});

describe('UPDATE /users/:id', () => {

});

describe('DELETE /users/:id', () => {

});
