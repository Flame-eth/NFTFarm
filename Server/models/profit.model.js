import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfitSchema = new Schema({
  walletID: {
    type: String,
    required: true,
  },
  profitType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  newBalance: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { ProfitSchema };
