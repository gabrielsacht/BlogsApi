const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
// const authToken = require('../middlewares/authToken.middleware');

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/user', userRouter);

module.exports = routers;