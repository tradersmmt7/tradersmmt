//Define a schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    userId: { type: String, required: true },
    transactionId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model(
  "transactions",
  TransactionSchema
);
module.exports = TransactionModel;
