const express = require('express');
const { usersRoutes } = require('./user');
const app = express.Router();

app.use('/user', usersRoutes);

module.exports = app;


