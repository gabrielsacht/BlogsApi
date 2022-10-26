const authService = require('../services/auth.service');

const login = async (req, res) => {
  const error = await authService.validateBody(req.body);

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  const user = await authService.validateLogin(req.body);

  if (user.e) return res.status(400).json({ message: user.e });
  
  const token = await authService.createToken(user);

  return res.status(200).json({ token });
};

module.exports = { 
  login,
};