const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const insert = async (userId, { title, content, categoryIds }) => {
  try {
    const post = await BlogPost.create(
      { title, content, userId },
    );
   
    const IdsWithPostId = categoryIds.map((item) => ({ postId: post.id, categoryId: item }));
    await PostCategory.bulkCreate(IdsWithPostId);
    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePost = async (id) => {
  await BlogPost.destroy({
    where: { id },
  });
};

const getPostByid = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return post;
};

const getPostByQuery = async (q) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

const update = async (id, { title, content }) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  return getPostByid(id);
};

module.exports = {
  insert,
  getPosts,
  getPostByid,
  update,
  deletePost,
  getPostByQuery,
};