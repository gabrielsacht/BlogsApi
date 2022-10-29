const postService = require('../services/post.service');
const categoryService = require('../services/category.service');

const insertPost = async (req, res) => {
  const { categoryIds } = req.body;
  const checkCategories = await categoryService.findAllByIds(categoryIds);

  if (checkCategories.count !== categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' }); 
  }
  const post = await postService.insert(req.user.id, req.body);

  res.status(201).json(post);
};

module.exports = {
  insertPost,
};