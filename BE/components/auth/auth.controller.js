exports.registerUser = async (req, res, next) => {
  try {
    const { user: UserModel } = mongoose.models;
    const user = req.body;
    const newUser = await UserModel.register(user);
    return res.SuccessHandler(newUser);
  } catch (error) {
    return res.ErrorHandler(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await db.UserModel.register(user);
    return res.SuccessHandler(newUser);
  } catch (error) {
    return res.ErrorHandler(error);
  }
};
