const Joi = require('joi');

const validateBody = (params) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.empty': '"displayName" length must be at least 8 characters long',
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': '"password" length must be at least 6 characters long',
      'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  });

  const { error } = schema.validate(params);

  return error;
};

module.exports = (req, res, next) => {
  const error = validateBody(req.body);
  if (error) return res.status(400).json({ message: error.message });

  next();
};