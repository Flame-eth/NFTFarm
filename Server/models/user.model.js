import mongoose from "mongoose";
const { Schema } = mongoose;
import { PledgeSchema } from "./pledging.model.js";
import { StakingSchema } from "./staking.model.js";

const UserSchema = new Schema({
  walletID: {
    type: String,
    required: true,
  },
  hasStaked: {
    type: Boolean,
    required: true,
  },
  hasPledged: {
    type: Boolean,
    required: true,
  },
  stakingRecord: [StakingSchema],
  pledgingRecord: [PledgeSchema],
  totalStakingIncome: {
    type: Number,
  },
  totalPledgingIncome: {
    type: Number,
  },
  totalPledge: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
