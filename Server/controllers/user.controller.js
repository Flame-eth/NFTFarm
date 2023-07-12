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
        stakingRecord: [],
        pledgingRecord: [],
        totalStakingIncome: 0.0,
        totalPledgingIncome: 0.0,
        totalPledge: 0.0,
        balance: 0.0,
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

export const updateBalance = async (req, res) => {
  try {
    const users = await User.find({});

    users.forEach(async (user) => {
      const currentTime = new Date();

      if (user.hasStaked) {
        const lastStake = user.stakingRecord[user.stakingRecord.length - 1];

        if (currentTime >= lastStake.nextProfitTime) {
          const hoursPassed = Math.floor(
            (currentTime - lastStake.nextProfitTime) / (1000 * 60 * 60)
          );
          const nextProfitTime = new Date(lastStake.nextProfitTime);
          nextProfitTime.setHours(nextProfitTime.getHours() + hoursPassed + 1);
          lastStake.nextProfitTime = nextProfitTime;

          const earningToBeAdded = lastStake.hourlyEarning * hoursPassed;

          user.balance += earningToBeAdded;
          user.totalStakingIncome += earningToBeAdded;
          lastStake.amountEarned += earningToBeAdded;

          await user.save();
        }
      }

      if (user.hasPledged) {
        const lastPledge = user.pledgingRecord[user.pledgingRecord.length - 1];

        if (
          currentTime >= lastPledge.nextProfitTime &&
          currentTime <= lastPledge.yieldDate
        ) {
          const hoursPassed = Math.floor(
            (currentTime - lastPledge.nextProfitTime) / (1000 * 60 * 60)
          );
          const nextProfitTime = new Date(lastPledge.nextProfitTime);
          nextProfitTime.setHours(nextProfitTime.getHours() + hoursPassed + 1);
          lastPledge.nextProfitTime = nextProfitTime;

          const hourlyEarning = lastPledge.dailyEarning / 24;
          const earningToAdd = hourlyEarning * hoursPassed;

          user.balance += earningToAdd;
          user.totalPledgingIncome += earningToAdd;
          lastPledge.amountEarned += earningToAdd;

          await user.save();
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateReferral = async (req, res) => {
  try {
    const findUser = await User.findOne({ walletID: req.body.walletID });

    if (!findUser.referrer) {
      findUser.referrer = req.body.referrer;
      await findUser.save();
    }

    

    

    res.status(200).json({
      success: true,
      data: findUser,
    });
  } catch (error) {}
};
