const { User } = require('../models');

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const insertUser = async (data) => {
  await User.create(data);
};

module.exports = {
  findByEmail,
  insertUser,
};
