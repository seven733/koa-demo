const jwt = require('jsonwebtoken');
const { secret } = require('config');

const sign = async data => await jwt.sign({ data }, secret, { expiresIn: '1h' }); // eslint-disable-line max-len

const verify = async (token, str) => await jwt.verify(token, str);

const decode = token => jwt.decode(token);

const getToken = function () {

};

module.exports = {
  sign,
  verify,
  decode,
  getToken
};
