const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
  insert,
};