const supertest = require('supertest');
const app = require('../index');
const Services = require('../src/service');
const Models = require('../src/model');
const { fakeTodos } = require('./fixtures/fake/todo.js');

const request = () => supertest(app.listen());

const test = require('ava');

let token;
let todoId;

test.before('get token', async () => {
  await Models.Todo.remove({});
  await Models.User.remove({});
  const user = { username: 'seven', password: '123' };
  await Services.Users.register(user);
  token = await Services.Users.login(user);
  await Models.Todo.insertMany(fakeTodos);
  await Models.User.remove({ name: 'test' });
});

test.before('get token', async () => {
});


test('test GET /users', async t => {
  const res = await request()
    .get('/users')
    .set('authorization', `Bearer ${token}`);

  t.is(200, res.status);
  t.true(res.body.length > 0);
});

test.serial('test POST /register', async t => {
  let user = { username: 'test', password: '123' };
  const res = await request()
    .post('/register')
    .send(user);

  t.is(200, res.status);
  t.is(res.body.name, 'test');

  const repeatRes = await request()
    .post('/register')
    .send(user);

  t.is(500, repeatRes.status);
  t.regex(repeatRes.body.message, /用户名重复/);
});

test.serial('test POST /login', async t => {
  let user = { username: 'test', password: '123' };
  let res = await request()
    .post('/login')
    .send(user);
  t.is(200, res.status);
  t.regex(res.body.msg, /登陆成功/);
});


test('test GET /todos', async t => {
  let res = await request()
    .get('/todos')
    .set('authorization', `Bearer ${token}`);

  t.is(200, res.status);
  t.true(res.body.length >= 5);
});


test.serial('test POST /todos', async t => {
  let todo = { title: 'thing', content: 'sing' };
  let res = await request()
    .post('/todos')
    .send(todo)
    .set('authorization', `Bearer ${token}`);

  t.is(200, res.status);
  t.is(res.body.title, 'thing');
  todoId = res.body._id;
});

test.serial('test POST /todos/:id', async t => {
  let todo = { title: 'thing1', content: 'dance' };
  let res = await request()
    .post(`/todos/${todoId}`)
    .send(todo)
    .set('authorization', `Bearer ${token}`);

  t.is(200, res.status);
  t.is(res.body.title, 'thing1');
  t.is(res.body.content, 'dance');
});

test.serial('test DELETE /todos/:id', async t => {
  let res = await request()
    .delete(`/todos/${todoId}`)
    .set('authorization', `Bearer ${token}`);

  t.is(200, res.status);
  t.true(res.body.success);
});
