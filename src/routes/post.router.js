const express = require('express');

const postFieldValidation = require('../middlewares/validations/postsFieldsValidations');
const authToken = require('../middlewares/authToken.middleware');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', authToken, postFieldValidation, postController.insertPost);
router.get('/:id', authToken, postController.getPostByid);
router.get('/', authToken, postController.getAllPosts);

module.exports = router;