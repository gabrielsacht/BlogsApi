const Joi = require('joi');

const validateBody = (params) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  return error;
};

module.exports = (req, res, next) => {
  const error = validateBody(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  next();
};