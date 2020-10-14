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
    const token = await UserService.login(email, password);
    return res.successHandler({
      token,
    });
  } catch (error) {
    return res.errorHandler(error);
  }
};
