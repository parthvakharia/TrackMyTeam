const sequelize = require('../boot/sequelize');
const {
  userSchema: { userTableName, userSchema },
} = require('./user');


sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;').then(() => {
  sequelize.define(userTableName, userSchema, { timestamp: true });
});
