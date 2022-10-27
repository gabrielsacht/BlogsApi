const categoryService = require('../services/category.service');

const insertCategory = async (req, res) => {
  const categoryCheck = await categoryService.findByName(req.body.name);
  if (categoryCheck) return res.status(409).json({ message: 'Category already registered' });

  const category = await categoryService.insert(req.body);

  res.status(201).json(category);
};

const findAll = async (_req, res) => {
  const categories = await categoryService.findAll();

  res.status(200).json(categories);
};

module.exports = {
  insertCategory,
  findAll,
};