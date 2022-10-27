const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../models');

const validateBody = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  return error;
};

const validateLogin = async ({ email, password }) => {
  console.log('validateLogin');
  const user = await User.findOne({ where: { email } });
  console.log('validateLogin depois');
  if (!user || user.password !== password) {
      const e = 'Invalid fields';
      return { e };
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;
  return userWithoutPassword;
};

const createToken = async (userWithoutPassword) => {
  const token = jwtUtil.createToken(userWithoutPassword);
  return token;
};

const validateToken = (token) => {
  if (!token) {
      const e = 'Token not found';
      return { e };
  }

  const user = jwtUtil.validateToken(token);

  return user;
};

module.exports = {
  validateBody,
  validateLogin,
  createToken,
  validateToken,
};
