const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const postRouter = require('./post.router');

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);
routers.use('/post', postRouter);

module.exports = routers;