const express = require('express');
const requestRouter = require('./controllers/request');
const middleware = require('./utils/middleware');

const app = express();
app.use(express.json());
app.use('/', requestRouter);
app.use(middleware.errorHandler);

module.exports = app;