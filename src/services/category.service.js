const { Category } = require('../models');

const findByName = async (name) => {
  const category = await Category.findOne({
    where: { name },
  });
  return category;
};

const insert = async (category) => {
  const categoryCreated = await Category.create(category);
  return categoryCreated;
};

module.exports = {
  findByName,
  insert,
};