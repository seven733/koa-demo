const mongoose = require('mongoose');

const { mongoUrl } = require('config');

const db = () => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true });
  mongoose.connection.on('connected', () => console.log('connected to the db'));
  mongoose.connection.on('open', () => console.log('mongodb connection opened:', mongoUrl));
  mongoose.connection.on('disconnected', () => console.log('disconnected to the db'));
  mongoose.connection.on('close', () => console.info('close the db'));
  mongoose.connection.on('reconnected', () => console.log('reconnected to the db'));
  mongoose.connection.on('error', (err) => console.error('Module "mongoose" connection is broken! Auto-Reconnection:\n', err));
};

module.exports = { db };
