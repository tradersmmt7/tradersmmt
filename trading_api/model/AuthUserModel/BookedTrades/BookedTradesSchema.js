//Define a schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookedTradeSchema = new Schema(
  {
    userId: { type: String, required: true },
    entryDate: { type: Date, required: true },
    exitDate: { type: Date, required: true },
    script: { type: String, required: true },
    longOrShort: { type: String, required: true },
    entryPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    initialStopLoss: { type: Number, required: true },
    exitPrice: { type: Number, required: true },
    entryValue: { type: Number, required: true },
    exitValue: { type: Number, required: true },
    absPandL: { type: Number, required: true },
    initialRiskTaken: { type: Number, required: true },
    rrr: { type: Number, required: true },
    charges: { type: Number, required: true },
  },
  { timestamps: true }
);

const getFields = "";

const BookTradesModel = mongoose.model("bookedTrades", bookedTradeSchema);
module.exports = { BookTradesModel, getFields };
