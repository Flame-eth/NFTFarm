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
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:walledID", getUser);
// router.get("/user/:walledID", createUser);
router.post("/user/:walledID", createUser);
router.patch("/user/update/:walledID", updateUser);
router.delete("/user/delete/:walledID", deleteUser);
router.get("/all", getAllUser);
router.get("/top", getTopUser);
router.get("/user/staking/:walledID", getUserStakingRecord);
router.get("/user/pledging/:walledID", getUserPledgingRecord);
router.get("/user/staking/income/:walledID", getUserTotalStakingIncome);
router.get("/user/pledging/income/:walledID", getUserTotalPledgingIncome);

export default router;
