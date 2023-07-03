const mongoose = require("mongoose");
const { Schema } = mongoose;

const PledgeSchema = new Schema({
  walletID: {
    type: String,
    required: true,
  },
  pledgeID: {
    type: Number,
    required: true,
  },
  pledgeAmount: {
    type: Number,
    required: true,
  },
  pledgePercentage: {
    type: Number,
    required: true,
  },
  pledgeDuration: {
    type: Number,
    required: true,
  },
  pledgeDate: {
    type: Date,
    required: true,
  },
  yieldDate: {
    type: Date,
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
  pledgeStatus: {
    type: Boolean,
    required: true,
  },
});



