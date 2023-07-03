import User from "../models/user.model.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  //   try {
  //     const user = new User({
  //       walletID: req.body.walletID,
  //       password: req.body.password,
  //       email: req.body.email,
  //     });
  //     await user.save();
  try {
    const findUser = await User.findOne({ walletID: req.body.walletID });
    if (findUser) {
      res.status(200).json({
        success: true,
        data: findUser,
      });
    } else {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};
