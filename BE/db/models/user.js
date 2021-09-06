'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const SAFE_OBJECT_KEYS = [
  'firstName',
  'lastName',
  'email',
  'location',
  'isVerified',
]

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static generatePassword(password) {
      return bcrypt.hashSync(password, 10);
    }
    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
    safeObject() {
      return SAFE_OBJECT_KEYS.reduce((user, safeKey) => {
        user[safeKey] = this[safeKey];
        return user;
      }, {});
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      location: DataTypes.GEOMETRY,
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
