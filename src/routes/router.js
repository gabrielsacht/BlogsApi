const express = require('express');
const authRouter = require('./auth.router'); 

const routers = express.Router();

routers.use('/login', authRouter);

module.exports = routers;