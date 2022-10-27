const express = require('express');

const categoryController = require('../controllers/category.controller');
const categoryValidation = require('../middlewares/validations/category.validation');
const authToken = require('../middlewares/authToken.middleware');

const router = express.Router();

router.post('/', authToken, categoryValidation, categoryController.insertCategory);

module.exports = router;