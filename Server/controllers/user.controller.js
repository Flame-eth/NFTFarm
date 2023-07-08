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
    // res.status(400).error(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const findUser = await User.findOne({ walletID: req.body.walletID });
    if (findUser) {
      res.status(200).json({
        success: true,
        data: findUser,
      });
    } else {
      // const user = await User.create(req.body);

      const user = new User({
        walletID: req.body.walletID,
        hasStaked: false,
        hasPledged: false,
      });
      await user.save();
      res.status(201).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserByWalletID = async (req, res, next) => {
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

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { walletID: req.params.walletID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ walletID: req.params.walletID });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopUser = async (req, res, next) => {
  try {
    const user = await User.find().sort({ totalPoint: -1 }).limit(10);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserStakingRecord = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    res.status(200).json({
      success: true,
      data: user.stakingRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPledgingRecord = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    res.status(200).json({
      success: true,
      data: user.pledgingRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTotalStakingIncome = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    res.status(200).json({
      success: true,
      data: user.totalStakingIncome,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTotalPledgingIncome = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    res.status(200).json({
      success: true,
      data: user.totalPledgingIncome,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTotalPledge = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    res.status(200).json({
      success: true,
      data: user.totalPledge,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePledgingRecord = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    user.pledgingRecord.push(req.body);
    await user.save();
    res.status(200).json({
      success: true,
      data: user.pledgingRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStakingRecord = async (req, res, next) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    user.stakingRecord.push(req.body);
    await user.save();
    res.status(200).json({
      success: true,
      data: user.stakingRecord,
    });
  } catch (error) {
    next(error);
  }
};
