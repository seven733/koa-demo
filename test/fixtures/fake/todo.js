const Chance = require('chance');
const chance = new Chance();
const R = require('ramda');

const fakeTodos = R.range(1, 6).map(() => ({
  title: chance.word(),
  content: chance.sentence()
}));

module.exports = { fakeTodos };
