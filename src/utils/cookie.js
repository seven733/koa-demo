

const setCookie = (ctx, token) => ctx.cookies.set(
  'token',
  token,
  {
    maxAge: 60 * 60 * 1000,
    httpOnly: true
  }
);

module.exports = {
  setCookie
};
