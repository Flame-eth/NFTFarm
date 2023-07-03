const mongoose = require("mongoose");
const { Schema } = mongoose;

const StakingSchema = new Schema({
  walletID: {
    type: String,
    required: true,
  },
  stakingID: {
    type: Number,
    required: true,
  },
  stakingAmount: {
    type: Number,
    required: true,
  },
  stakingPercentage: {
    type: Number,
    required: true,
  },
  stakingDate: {
    type: Date,
    required: true,
  },
  hourlyEarning: {
    type: Number,
    required: true,
  },
  dailyEarning: {
    type: Number,
    required: true,
  },
  targetEarning: {
    type: Number,
    required: true,
  },
  amountEarned: {
    type: Number,
    required: true,
  },
  stakingStatus: {
    type: Boolean,
    required: true,
  },
});

export { StakingSchema };
