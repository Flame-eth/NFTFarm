import mongoose from "mongoose";

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    walletID: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { collection: "transactions", timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
