//Define a schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PortfolioStatsSchema = new Schema(
  {
    userId: { type: String, required: true },
    startingCapital: { type: Number, required: true },
    worstCaseScenario: { type: Number, required: true },
    worstCaseScenarioData: { type: Number, required: true }, // have to check this
    riskPerTrade: { type: Number, required: true },
    riskPerTradeData: { type: Number, required: true },// have to check this
    openPandL: { type: Number, required: true },
    bookedPandL: { type: Number, required: true },
    currentCapital: { type: Number, required: true },
    withdraw: { type: Number, required: true },
    charges: { type: Number, required: true },
  },
  { timestamps: true }
);

const PortfolioStatsModel = mongoose.model(
  "portfolioStats",
  PortfolioStatsSchema
);

module.exports = PortfolioStatsModel;