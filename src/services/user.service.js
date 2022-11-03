const { User } = require('../models');

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const findById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const findAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const insertUser = async (data) => {
  await User.create(data);
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = {
  findByEmail,
  insertUser,
  findAll,
  findById,
  deleteUser,
};
