const Models = require('../model');
const R = require('ramda');

const Users = require('./user');
const Todos = require('./todo');

const services = {
  Users,
  Todos
};

let output = {};

R.forEachObjIndexed((service, name) => {
  const result = service(Models);
  output[name] = result;
})(services);


module.exports = output;
