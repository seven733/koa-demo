const test = require('ava');
const Models = require('../../src/model/index');
const Services = require('../../src/service');
const Chance = require('chance');
const chance = new Chance();
const Mongo = require('../../src/model/mongoose');
Mongo.db();

const fakeTodo = () => ({
  title: chance.word(),
  content: chance.sentence()
});


test.serial('test createTodo should succsss', async t => {
  const data = fakeTodo();
  const countBefore = await Models.Todo.countDocuments({});

  const result = await Services.Todos.createTodo(data);
  const countAfter = await Models.Todo.countDocuments({});
  t.is(countAfter, countBefore + 1);
  t.is(result.title, data.title);
  t.is(result.content, data.content);
});

test.serial('test getTodos should success', async t => {
  const data = fakeTodo();
  const res = await Services.Todos.createTodo(data);
  const id = res._id;
  let result = await Services.Todos.getTodos();
  t.true(result instanceof Array);
  t.true(result.length > 0);

  let getById = await Services.Todos.getTodos({ id });
  t.is(getById.length, 1);
  t.is(getById[0].title, data.title);
});

test.serial('test editTodo should success', async t => {
  const data = fakeTodo();
  const newData = fakeTodo();
  const res = await Services.Todos.createTodo(data);
  const id = res._id;

  let result = await Services.Todos.editTodo(id, newData);
  t.is(result.title, newData.title);
  t.is(result.content, newData.content);
});

test.serial('test deleteTodo should success', async t => {
  const data = fakeTodo();
  const res = await Services.Todos.createTodo(data);
  const id = res._id;

  const deleteBefore = await Services.Todos.getTodos({ id });
  t.true(deleteBefore.length === 1);

  const result = await Services.Todos.deleteTodo(id);
  t.true(result.success);
  const deleteAfter = await Services.Todos.getTodos({ id });
  t.true(deleteAfter.length === 0);
});
