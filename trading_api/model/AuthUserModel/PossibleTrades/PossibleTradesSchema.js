//Define a schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PossibleTradesSchema = new Schema(
  {
    userId: { type: String, required: true },
    script: { type: String, required: true },
    longOrShort: { type: String, required: true },
    entryPrice: { type: Number, required: true },
    stopLoss: { type: Number, required: true },
    risk: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const getFields =
  "entryPrice stopLoss longOrShort script risk quantity updatedAt createdAt";

const PossibleTradesModel = mongoose.model(
  "possibleTrades",
  PossibleTradesSchema
);
module.exports = { PossibleTradesModel, getFields };
