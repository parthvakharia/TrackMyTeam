const express = require('express');
const joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});
const controller = require('./auth.controller');

const app = express.Router();

const validationSchema = {
  register: joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    location: joi.string().required(),
    email: joi.string().email().required(),
    picture: joi.string(),
  }),
  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

app
  .route('/register')
  .post(validator.body(validationSchema.register), controller.registerUser);

app
  .route('/login')
  .post(validator.body(validationSchema.login), controller.loginUser);

module.exports = app;
