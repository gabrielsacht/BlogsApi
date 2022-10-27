const express = require('express');
const userController = require('../controllers/user.controller');
const userValidation = require('../middlewares/validations/user.validation');
const authToken = require('../middlewares/authToken.middleware');

const router = express.Router();

router.post('/', userValidation, userController.createUser);

router.get('/:id', authToken, userController.findUserById);

router.get('/', authToken, userController.findAllUsers);

module.exports = router;