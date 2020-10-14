const joi = require('@hapi/joi');
const db = require('./db.json');

require('dotenv').config({
  path: [__dirname, '..', 'environment', `.env.${process.env.ENV}`].join('/'),
});

const joiENVSchema = {
  ENV: joi.string().required().default('dev').description('ENV is required'),
  PORT: joi.string().required().description('PORT is required'),
  JWT_SECRET: joi.string().required().description('JWT_SECRET is required'),
};

const unverifiedVars = {};
for (const key in joiENVSchema) {
  unverifiedVars[key] = process.env[key];
}

const { error, value: envVars } = joi
  .object(joiENVSchema)
  .validate(unverifiedVars);

if (error) {
  throw new Error(error);
}

const DB_CONFIG = db[envVars.ENV];
module.exports = {
  ENV: envVars.ENV,
  DATABASE_URL: `postgres://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`,
  DB_CONFIG: DB_CONFIG,
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET
};
