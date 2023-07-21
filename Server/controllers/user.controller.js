import User from "../models/user.model.js";
import { ethers } from "ethers"; // import ethers.js library
import Web3 from "web3";
// import * as abi from "../utils/ERC20.json" assert { type: "json" };
import { abi } from "../utils/abi.js";

// console.log(ethers.provider);

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

async function fetchUSDTBalance(address) {
  const usdtContractAddress = "0x29272F1212Ed74F30962F1D2c61238fb87cf3d5F";
  const provider =
    "https://celo-alfajores.infura.io/v3/e3f8553f110f4c34bef36bf2153e8d88";

  const web3 = new Web3(provider);

  const contract = new web3.eth.Contract(abi, usdtContractAddress);

  try {
    const balance = await contract.methods.balanceOf(address).call();
    return balance.toString();
    // console.log(`USDT balance for ${address}: ${balance.toString()}`);
  } catch (error) {
    // console.error("Error fetching USDT balance:", error);
    return error;
  }
}

export const updateBalance = async (req, res) => {
  try {
    const users = await User.find({});

    users.forEach(async (user) => {
      const currentTime = new Date();
      // console.log(currentTime);

      if (user.hasStaked) {
        const lastStake = user.stakingRecord[user.stakingRecord.length - 1];

        if (currentTime >= lastStake.nextProfitTime) {
          const hoursPassed = Math.floor(
            (currentTime - lastStake.nextProfitTime) / (1000 * 60 * 60)
          );
          // console.log(hoursPassed);
          const nextProfitTime = new Date(lastStake.nextProfitTime);
          nextProfitTime.setHours(nextProfitTime.getHours() + hoursPassed + 1);
          lastStake.nextProfitTime = nextProfitTime;

          let earningToBeAdded;

          if (hoursPassed > 1) {
            earningToBeAdded = lastStake.hourlyEarning * hoursPassed;
          } else {
            earningToBeAdded = lastStake.hourlyEarning;
          }

          const prevBalance = user.balance;

          user.balance += earningToBeAdded;
          user.totalStakingIncome += earningToBeAdded;
          lastStake.amountEarned += earningToBeAdded;

          const newRecord = {
            walletID: user.walletID,
            profitType: "Stake Income",
            amount: earningToBeAdded,
            newBalance: prevBalance + earningToBeAdded,
          };

          user.accountRecord.push(newRecord);

          await user.save();

          if (user.referrer) {
            const firstPopulation = await User.findOne({
              walletID: user?.referrer,
            });
            if (firstPopulation) {
              const earningToAdd = (earningToBeAdded * 30) / 100;
              firstPopulation.firstPopulationIncome += earningToAdd;
              const newRecord = {
                walletID: firstPopulation.walletID,
                profitType: "Referral Income",
                amount: earningToAdd,
                newBalance: firstPopulation.balance + earningToAdd,
              };
              firstPopulation.accountRecord.push(newRecord);
              firstPopulation.balance += earningToAdd;
              await firstPopulation.save();
            }

            const secondPopulation = await User.findOne({
              walletID: firstPopulation?.referrer,
            });
            if (secondPopulation) {
              const earningToAdd = (earningToBeAdded * 20) / 100;
              secondPopulation.secondPopulationIncome += earningToAdd;
              const newRecord = {
                walletID: secondPopulation.walletID,
                profitType: "Referral Income",
                amount: earningToAdd,
                newBalance: secondPopulation.balance + earningToAdd,
              };
              secondPopulation.accountRecord.push(newRecord);
              secondPopulation.balance += earningToAdd;
              await secondPopulation.save();
            }

            const thirdPopulation = await User.findOne({
              walletID: secondPopulation?.referrer,
            });
            if (thirdPopulation) {
              const earningToAdd = (earningToBeAdded * 10) / 100;
              thirdPopulation.thirdPopulationIncome += earningToAdd;
              const newRecord = {
                walletID: thirdPopulation.walletID,
                profitType: "Referral Income",
                amount: earningToAdd,
                newBalance: thirdPopulation.balance + earningToAdd,
              };
              thirdPopulation.accountRecord.push(newRecord);
              thirdPopulation.balance += earningToAdd;

              await thirdPopulation.save();
            }
          }
        }

        const balance = await fetchUSDTBalance(user.walletID);
        try {
          if (
            balance >= lastStake.minAmount &&
            balance <= lastStake.maxAmount
          ) {
            user.hasStaked = true;
            lastStake.stakingStatus = true;
            lastStake.dailyEarning =
              balance * (lastStake.stakingPercentage / 100);
            lastStake.hourlyEarning =
              (balance * (lastStake.stakingPercentage / 100)) / 24;

            await user.save();
          }
        } catch (error) {}
      }

      //TEST CODE START

      // if (user.hasStaked) {
      //   const lastStake = user.stakingRecord[user.stakingRecord.length - 1];

      //   if (currentTime >= lastStake.nextProfitTime) {
      //     // const hoursPassed = Math.floor(
      //     //   (currentTime - lastStake.nextProfitTime) / (1000 * 60 * 60)
      //     // );
      //     const nextProfitTime = new Date(lastStake.nextProfitTime);
      //     nextProfitTime.setMinutes(nextProfitTime.getMinutes() + 1);
      //     lastStake.nextProfitTime = nextProfitTime;

      //     const earningToBeAdded = lastStake.hourlyEarning * 1;

      //     user.balance += earningToBeAdded;
      //     user.totalStakingIncome += earningToBeAdded;
      //     lastStake.amountEarned += earningToBeAdded;
      //     const newRecord = {
      //       walletID: user.walletID,
      //       profitType: "Stake Income",
      //       amount: earningToBeAdded,
      //       newBalance: user.balance + earningToBeAdded,
      //     };

      //     user.accountRecord.push(newRecord);

      //     await user.save();

      //     if (user.referrer) {
      //       const firstPopulation = await User.findOne({
      //         walletID: user?.referrer,
      //       });
      //       if (firstPopulation) {
      //         const earningToAdd = (earningToBeAdded * 30) / 100;
      //         firstPopulation.firstPopulationIncome += earningToAdd;
      //         const newRecord = {
      //           walletID: firstPopulation.walletID,
      //           profitType: "Referral Income",
      //           amount: earningToAdd,
      //           newBalance: firstPopulation.balance + earningToAdd,
      //         };
      //         firstPopulation.accountRecord.push(newRecord);
      //         firstPopulation.balance += earningToAdd;
      //         await firstPopulation.save();
      //       }

      //       const secondPopulation = await User.findOne({
      //         walletID: firstPopulation?.referrer,
      //       });
      //       if (secondPopulation) {
      //         const earningToAdd = (earningToBeAdded * 20) / 100;
      //         secondPopulation.secondPopulationIncome += earningToAdd;
      //         const newRecord = {
      //           walletID: secondPopulation.walletID,
      //           profitType: "Referral Income",
      //           amount: earningToAdd,
      //           newBalance: secondPopulation.balance + earningToAdd,
      //         };
      //         secondPopulation.accountRecord.push(newRecord);
      //         secondPopulation.balance += earningToAdd;
      //         await secondPopulation.save();
      //       }

      //       const thirdPopulation = await User.findOne({
      //         walletID: secondPopulation?.referrer,
      //       });
      //       if (thirdPopulation) {
      //         const earningToAdd = (earningToBeAdded * 10) / 100;
      //         thirdPopulation.thirdPopulationIncome += earningToAdd;
      //         const newRecord = {
      //           walletID: thirdPopulation.walletID,
      //           profitType: "Referral Income",
      //           amount: earningToAdd,
      //           newBalance: thirdPopulation.balance + earningToAdd,
      //         };
      //         thirdPopulation.accountRecord.push(newRecord);
      //         thirdPopulation.balance += earningToAdd;

      //         await thirdPopulation.save();
      //       }
      //     }
      //   }
      // }

      //TEST CODE END

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
          let earningToAdd;
          if (hoursPassed > 1) {
            earningToAdd = hourlyEarning * hoursPassed;
          } else {
            earningToAdd = hourlyEarning;
          }

          const prevBalance = user.balance;

          user.balance += earningToAdd;
          user.totalPledgingIncome += earningToAdd;
          lastPledge.amountEarned += earningToAdd;

          const newRecord = {
            walletID: user.walletID,
            profitType: "Pledge Income",
            amount: earningToAdd,
            newBalance: prevBalance + earningToAdd,
          };

          user.accountRecord.push(newRecord);

          await user.save();

          if (user.referrer) {
            const firstPopulation = await User.findOne({
              walletID: user?.referrer,
            });
            if (firstPopulation) {
              const earningToBeAdded = (earningToAdd * 30) / 100;
              firstPopulation.firstPopulationIncome += earningToBeAdded;
              const newRecord = {
                walletID: firstPopulation.walletID,
                profitType: "Referral Income",
                amount: earningToBeAdded,
                newBalance: firstPopulation.balance + earningToBeAdded,
              };
              firstPopulation.accountRecord.push(newRecord);
              firstPopulation.balance += earningToBeAdded;
              await firstPopulation.save();
            }

            const secondPopulation = await User.findOne({
              walletID: firstPopulation?.referrer,
            });
            if (secondPopulation) {
              const earningToBeAdded = (earningToAdd * 20) / 100;
              secondPopulation.secondPopulationIncome += earningToBeAdded;
              const newRecord = {
                walletID: secondPopulation.walletID,
                profitType: "Referral Income",
                amount: earningToBeAdded,
                newBalance: secondPopulation.balance + earningToBeAdded,
              };
              secondPopulation.accountRecord.push(newRecord);
              secondPopulation.balance += earningToBeAdded;
              await secondPopulation.save();
            }

            const thirdPopulation = await User.findOne({
              walletID: secondPopulation?.referrer,
            });
            if (thirdPopulation) {
              const earningToBeAdded = (earningToAdd * 10) / 100;
              thirdPopulation.thirdPopulationIncome += earningToBeAdded;
              const newRecord = {
                walletID: thirdPopulation.walletID,
                profitType: "Referral Income",
                amount: earningToBeAdded,
                newBalance: thirdPopulation.balance + earningToBeAdded,
              };
              thirdPopulation.accountRecord.push(newRecord);
              thirdPopulation.balance += earningToBeAdded;

              await thirdPopulation.save();
            }
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateReferral = async (req, res) => {
  const findUser = await User.findOne({ walletID: req.body.walletID });
  if (!findUser.referrer) {
    findUser.referrer = req.body?.referrer;
    await findUser.save();
  }

  try {
    const firstPopulation = await User.find({ walletID: findUser?.referrer });

    if (firstPopulation) {
      firstPopulation.firstPopulationCount += 1;
      await firstPopulation.save();
    }

    const secondPopulation = await User.find({
      walletID: firstPopulation?.referrer,
    });

    if (secondPopulation) {
      secondPopulation.secondPopulationCount += 1;
      await secondPopulation.save();
    }

    const thirdPopulation = await User.find({
      walletID: secondPopulation?.referrer,
    });

    if (thirdPopulation) {
      thirdPopulation.thirdPopulationCount += 1;
      await thirdPopulation.save();
    }

    res.status(200).json({
      success: true,
      data: findUser,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error,
    });
  }
};

export const payReferral = async (req, res) => {
  try {
    const findUser = await User.findOne({ walletID: req.body.walletID });
    const amount = req.body.amount;

    const firstPopulation = await User.find({ walletID: findUser.referrer });

    if (firstPopulation) {
      const earningToAdd = (amount * 30) / 100;
      firstPopulation.firstPopulationIncome += earningToAdd;
      await firstPopulation.save();
    }

    const secondPopulation = await User.find({
      walletID: firstPopulation.referrer,
    });

    if (secondPopulation) {
      const earningToAdd = (amount * 20) / 100;
      secondPopulation.secondPopulationIncome += earningToAdd;
      await secondPopulation.save();
    }

    const thirdPopulation = await User.find({
      walletID: secondPopulation.referrer,
    });

    if (thirdPopulation) {
      const earningToAdd = (amount * 10) / 100;
      thirdPopulation.thirdPopulationIncome += earningToAdd;
      await thirdPopulation.save();
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error,
    });
  }
};

export const updateAccountRecord = async (req, res) => {
  try {
    const user = await User.findOne({ walletID: req.params.walletID });
    user.accountRecord.push(req.body);
    await user.save();
    res.status(200).json({
      success:
        "Account record updated successfully. Balance has been updated accordingly.",
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error,
    });
  }
};
