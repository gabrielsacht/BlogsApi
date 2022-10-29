const { Op } = require('sequelize');
const { Category } = require('../models');

const findByName = async (name) => {
  const category = await Category.findOne({
    where: { name },
  });
  return category;
};

const findAllByIds = async (ids) => {
  const categories = await Category.findAndCountAll({
    where: {
      id: {
        [Op.or]: ids,
      },
    },
  });
  return categories;
};

const findAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const insert = async (category) => {
  const categoryCreated = await Category.create(category);
  return categoryCreated;
};

module.exports = {
  findByName,
  insert,
  findAll,
  findAllByIds,
};