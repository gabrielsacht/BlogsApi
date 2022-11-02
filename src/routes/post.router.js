const express = require('express');

const postFieldValidation = require('../middlewares/validations/postsFieldsValidations');
const postPutFieldValidation = require('../middlewares/validations/postPutFieldValidation');
const authToken = require('../middlewares/authToken.middleware');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', authToken, postFieldValidation, postController.insertPost);
router.put('/:id', authToken, postPutFieldValidation, postController.updatePost);
router.get('/:id', authToken, postController.getPostByid);
router.get('/', authToken, postController.getAllPosts);

module.exports = router;