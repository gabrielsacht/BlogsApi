const express = require('express');

const postFieldValidation = require('../middlewares/validations/postsFieldsValidations');
const authToken = require('../middlewares/authToken.middleware');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', authToken, postFieldValidation, postController.insertPost);

module.exports = router;