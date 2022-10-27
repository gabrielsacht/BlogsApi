const authService = require('../services/auth.service');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = await authService.validateToken(authorization);

  if (user.e) return res.status(401).json({ message: user.e });

  req.user = user;

  next();
};
