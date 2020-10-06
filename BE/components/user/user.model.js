const { DataTypes } = require('sequelize');

const userTableName = 'user';
const userSchema = {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
  },
};

module.exports = { userTableName, userSchema };
