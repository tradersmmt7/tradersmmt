//Define a schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OpenTradesSchema = new Schema(
  {
    userId: { type: String, required: true },
    entryDate: { type: String, required: true },
    script: { type: String, required: true },
    longOrShort: { type: String, required: true },
    entryPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    initialStopLoss: { type: Number, required: true },
    currentStopLoss: { type: Number, required: true },
    target: { type: String, required: true },
    cmp: { type: Number, required: true },
    absRet: { type: Number, required: true },
  },
  { timestamps: true }
);

const OpenTradesModel = mongoose.model("openTrades", OpenTradesSchema);
module.exports = OpenTradesModel;
