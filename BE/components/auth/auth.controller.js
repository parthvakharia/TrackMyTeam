const { verifyToken } = require('../../helper/jwt');
const UserService = require('../user/user.service');

exports.registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await UserService.create(user);
    return res.successHandler(newUser);
  } catch (error) {
    return res.errorHandler(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserService.login(email, password);
    
    return res.successHandler({
      token,
      user
    });
  } catch (error) {
    return res.errorHandler(error);
  }
};

exports.loggedInUserData = async (req, res) => {
  try {
    const { token } = req.params;
    const { userId } = verifyToken(token);
    const user = await UserService.getUserById(userId);
    
    return res.successHandler(user);
  } catch (error) {
    return res.errorHandler(error);
  }
}
