import mongoose from "mongoose";
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
  hourlyEarning: {
    type: Number,
    required: true,
  },
  dailyEarning: {
    type: Number,
    required: true,
  },
  amountEarned: {
    type: Number,
    default: 0,
  },
  stakingStatus: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  nextProfitTime: {
    type: Date,
  },
});

export { StakingSchema };
