import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import transactionRoute from "./routes/transaction.route.js";
import cron from "node-cron";
import { updateBalance } from "./controllers/user.controller.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const connectDB = async () => {
  // console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // res.header("Access-Control-Allow-Headers", "Content-Type");

  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  // );

  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });

  next();
});

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);

cron.schedule("* * * * *", () => {
  // Task to be executed
  updateBalance();
  console.log("Cron job running...");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
