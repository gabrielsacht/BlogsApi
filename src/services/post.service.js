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

const getPostByid = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return post;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
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
};