const { User } = require('../../db/models');
const JWT = require('../../helper/jwt');

/**
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} password
 * @param {string} email
 * @param {array} location [lat,lng]
 *
 */
exports.create = ({ firstName, lastName, password, email, location }) => {
  password = User.generatePassword(password);
  return User.create({
    firstName,
    lastName,
    password,
    email,
    location: {
      type: 'Point',
      coordinates: location,
    },
  });
};

exports.login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if(!user) {
    throw new Error(`No user found with email ${email}`);
  }

  if(user.comparePassword(password)) {
    return JWT.generateToken({
        userId: user.id,
        isVerified: user.isVerified
    });
  }
  throw new Error(`Incorrect password`);
};
