const { setCookie } = require('../../utils/cookie');

module.exports = ({ Users }) => {
  return {
    getUsers: async (ctx) => {
      ctx.body = await Users.getUsers();
    },
    login: async (ctx) => {
      const token = await Users.login(ctx.request.body);
      setCookie(ctx, token);
      ctx.body = {
        msg: '登陆成功',
        token
      };
    },
    register: async ctx => {
      ctx.body = await Users.register(ctx.request.body);
    }
  };
};
