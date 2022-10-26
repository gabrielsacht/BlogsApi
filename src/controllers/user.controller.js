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

module.exports = {
  createUser,
};