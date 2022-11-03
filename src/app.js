import 'express-async-errors';

const express = require('express');

const routes = require('./routes/router');
const errorMiddleware = require('./middlewares/error');

// ...

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
