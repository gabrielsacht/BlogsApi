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

const getAllPosts = async (_req, res) => {
  const posts = await postService.getPosts();

  res.status(200).json(posts);
};

const getPostByid = async (req, res) => {
  const post = await postService.getPostByid(req.params.id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostByid(id);

  if (post.users.id !== req.user.id) return res.status(401).json({ message: 'Unauthorized user' });

  const postUpdated = await postService.update(id, req.body);

  res.status(200).json(postUpdated);
};
 
module.exports = {
  insertPost,
  getAllPosts,
  getPostByid,
  updatePost,
};