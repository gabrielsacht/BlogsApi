const userService = require('../services/user.service');
const authService = require('../services/auth.service');

const createUser = async (req, res) => {
  const userCheck = await userService.findByEmail(req.body.email);

  if (userCheck) return res.status(409).json({ message: 'User already registered' });

  await userService.insertUser(req.body);

  const user = await authService.validateLogin(req.body);

  if (user.e) return res.status(400).json({ message: user.e });
  
  const token = await authService.createToken(user);

  return res.status(201).json({ token });
};

const findAllUsers = async (_req, res) => {
  const users = await userService.findAll();

  res.status(200).json(users);
};

const findUserById = async (req, res) => {
  const users = await userService.findById(req.params.id);

  if (!users) return res.status(404).json({ message: 'User does not exist' });

  res.status(200).json(users);
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
};