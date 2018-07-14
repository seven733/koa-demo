module.exports = () => async (ctx, next) => {
  if (!ctx.session.user && ctx.method === 'POST' && /^\/api\//.test(ctx.url)) {
    ctx.throw(401);
  }
  await next();
};

