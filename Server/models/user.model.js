import mongoose from "mongoose";
const { Schema } = mongoose;
import { PledgeSchema } from "./pledging.model.js";
import { StakingSchema } from "./staking.model.js";
import { ProfitSchema } from "./profit.model.js";

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
  accountRecord: [ProfitSchema],

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
  referrer: {
    type: String,
  },
  firstPopulationCount: {
    type: Number,
    default: 0,
  },
  secondPopulationCount: {
    type: Number,
    default: 0,
  },
  thirdPopulationCount: {
    type: Number,
    default: 0,
  },
  firstPopulationIncome: {
    type: Number,
    default: 0,
  },
  secondPopulationIncome: {
    type: Number,
    default: 0,
  },
  thirdPopulationIncome: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
