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
    location: joi.array().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    password: joi.string().required(),
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

app
  .route('/logged-in-user-data/:token')
  .get(validator.body(validationSchema.login), controller.loggedInUserData);

module.exports = app;
