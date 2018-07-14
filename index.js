const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');

const { router } = require('./src/router');
const { errorHandler } = require('./mw/errorHandler');

const { secret, port } = require('config');

const Mongo = require('./src/model/mongoose');
Mongo.db();


app
  .use(koaJwt({
    secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(ctx) {
      if (ctx.cookies && ctx.cookies.get('token')) {
        return ctx.cookies.get('token');
      } else if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
        return ctx.headers.authorization.split(' ')[1];
      } else if (ctx.query && ctx.query.token) {
        return ctx.query.token;
      }
      return null;
    }
  }).unless({ path: [/^\/register/, /^\/login/] }))
  .use(bodyParser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(port);


module.exports = app;
