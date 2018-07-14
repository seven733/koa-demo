const { getHashPassword, comparehashPassword } = require('../../utils/encrypt.js');
const JWT = require('../../utils/jwt.js');

module.exports = ({ User }) => {
  return {
    getUsers: async () => {
      return await User.find({});
    },
    register: async (data) => {
      const { username, password } = data;

      const hashPwd = await getHashPassword(password);
      const userDoc = {
        name: username,
        password: hashPwd
      };

      return await User.create(userDoc)
        .then(result => result)
        .catch(err => {
          if (err.code === 11000) {
            throw Error('创建用户失败，用户名重复');
          }
        });
    },
    login: async (data) => {
      const { username, password } = data;
      const user = await User.findOne({ name: username }).lean();
      const hasPwd = user.password;

      const checkSuccess = await comparehashPassword(password, hasPwd);
      if (!checkSuccess) {
        throw Error('密码错误');
      }
      return await JWT.sign({ name: username });
    }
  };
};
