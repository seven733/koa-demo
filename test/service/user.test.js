const test = require('ava');
const Models = require('../../src/model/index');
const Services = require('../../src/service');
const Chance = require('chance');
const chance = new Chance();
const Mongo = require('../../src/model/mongoose');
Mongo.db();
const R = require('ramda');

const fakeUser = () => ({
  name: chance.name(),
  paswword: chance.natural()
});

test.before('init some user data', async () => {
  const Users = R.range(1, 6).map(() => fakeUser());
  await Models.User.insertMany(Users);
});

test.serial('test getUsers should succsss', async t => {
  let result = await Services.Users.getUsers();
  t.true(result instanceof Array);
  t.true(result.length >= 5);
});

