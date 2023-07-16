import express from "express";
import {
  getAllTransaction,
  newTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/create", newTransaction);
router.get("/all", getAllTransaction);

export default router;
