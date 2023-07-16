import transactionModel from "../models/transaction.model";

export const newTransaction = async (req, res) => {
  try {
    const { body } = req;
    const transaction = await transactionModel.create(body);
    res.status(200).json({
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getAllTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.find({});
    res.status(200).json({
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
