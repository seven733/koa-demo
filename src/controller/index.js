const Services = require('../service');
const R = require('ramda');

const Users = require('./user');
const Todos = require('./todo');

const controllers = {
  Users,
  Todos
};

let output = {};

R.forEachObjIndexed((controller, name) => {
  const result = controller(Services);
  output[name] = result;
})(controllers);

module.exports = output;
