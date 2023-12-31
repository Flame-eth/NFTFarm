import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getTopUser,
  getUser,
  getUserPledgingRecord,
  getUserStakingRecord,
  getUserTotalPledgingIncome,
  getUserTotalStakingIncome,
  payReferral,
  updateAccountRecord,
  updateBalance,
  updatePledgingRecord,
  updateReferral,
  updateStakingRecord,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:walletID", getUser);
// router.get("/user/:walledID", createUser);
router.post("/create", createUser);
router.patch("/update/:walletID", updateUser);
router.delete("/delete/:walletID", deleteUser);
router.get("/", getAllUser);
router.get("/top", getTopUser);
router.get("/staking/record/:walletID", getUserStakingRecord);
router.get("/pledging/record/:walletID", getUserPledgingRecord);
router.get("/staking/income/:walletID", getUserTotalStakingIncome);
router.get("/pledging/income/:walletID", getUserTotalPledgingIncome);
router.post("/staking/new/:walletID", updateStakingRecord);
router.post("/pledging/new/:walletID", updatePledgingRecord);

router.patch("/updateBalance", updateBalance);
router.patch("/updateReferral", updateReferral);
router.patch("/payReferral", payReferral);
router.patch("/updateAccountRecord/:walletID", updateAccountRecord);

export default router;
