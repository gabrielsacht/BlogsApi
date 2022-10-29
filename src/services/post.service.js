const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const { BlogPost, PostCategory } = require('../models');

const insert = async (userId, { title, content, categoryIds }) => {
  const t = await sequelize.transaction();

  try {
    const post = await BlogPost.create(
      { title, content, userId },
      { transaction: t },
    );

    const IdsWithPostId = categoryIds.map((item) => ({ postId: post.id, categoryId: item }));

    await PostCategory.bulkCreate(
      { IdsWithPostId },
      { transaction: t },
    );

    return BlogPost.findOne({ where: { id: post.id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  insert,
};