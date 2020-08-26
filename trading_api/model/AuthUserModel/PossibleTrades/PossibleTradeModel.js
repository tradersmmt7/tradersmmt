const {
  PossibleTradesModel,
  getFields,
} = require("../PossibleTrades/PossibleTradesSchema");
const PortfolioStatsModel = require("../PortfolioStats/PortfolioStatsSchema");
const { difference, ceiling } = require("../../../UtilFunctions/helpers");

const getPossibleTrades = (req, res) => {
  let { id } = req.body.userDetails;
  PossibleTradesModel.find({ userId: id }, getFields, (err, response) => {
    if (err) {
      res.json({
        success: false,
        message: err,
        data: [],
      });
    } else {
      res.json({
        success: true,
        message: "Possible Trades data found",
        data: response,
      });
    }
  });
};

const savePossibleTrade = (req, res) => {
  let entryPrice = parseInt(req.body.entryPrice);
  let stopLoss = parseInt(req.body.stopLoss);
  let script = req.body.script;
  let longOrShort = req.body.longOrShort === "long" ? "Long" : "Short";

  if (!isNaN(entryPrice) && !isNaN(stopLoss) && script && longOrShort) {
    let riskTemp = difference(entryPrice, stopLoss);
    let { id } = req.body.userDetails;
    PortfolioStatsModel.find({ userId: id }, (err, response) => {
      if (err) {
        res.json({
          success: false,
          message: err,
          data: [],
        });
      } else {
        let quantityTemp =
          response[0].riskPerTradeData !== 0
            ? ceiling(response[0].riskPerTradeData / riskTemp, 5)
            : 0;
        let saveObject = {
          userId: req.body.userDetails.id,
          entryPrice,
          stopLoss,
          longOrShort,
          script,
          risk: riskTemp, // abs(entryprice - stoploss)
          quantity: quantityTemp, // ceiling(20/23,5) 20 - risk trade [portfolio stats] / risk
        };
        PossibleTradesModel.create(saveObject, (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: err,
              data: [],
            });
          } else {
            res.json({
              success: true,
              message: "Possible trade value successfully added",
              data: [],
            });
          }
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Invalid entries",
      data: [],
    });
  }
};

const updatePossibleTrade = (req, res) => {
  let entryPrice = parseInt(req.body.entryPrice);
  let stopLoss = parseInt(req.body.stopLoss);
  let script = req.body.script;
  let longOrShort = req.body.longOrShort === "long" ? "Long" : "Short";

  if (!isNaN(entryPrice) && !isNaN(stopLoss) && script && longOrShort) {
    let riskTemp = difference(entryPrice, stopLoss);
    let { id } = req.body.userDetails;
    PortfolioStatsModel.find({ userId: id }, (err, response) => {
      if (err) {
        res.json(500, {
          success: false,
          message: err,
          data: [],
        });
      } else {
        let quantityTemp =
          response[0].riskPerTradeData !== 0
            ? ceiling(response[0].riskPerTradeData / riskTemp, 5)
            : 0;
        let updateObject = {
          userId: req.body.userDetails.id,
          entryPrice,
          stopLoss,
          longOrShort,
          script,
          risk: riskTemp, // abs(entryprice - stoploss)
          quantity: quantityTemp, // ceiling(20/23,5) 20 - risk trade [portfolio stats] / risk
        };
        PossibleTradesModel.findOneAndUpdate(
          { _id: req.body._id },
          updateObject,
          { upsert: true },
          function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.json({
              success: true,
              message: "Possible trade value successfully updated",
              data: [],
            });
          }
        );
      }
    });
  } else {
    res.json({
      success: false,
      message: "Invalid entries",
      data: [],
    });
  }
};

const deletePossibleTrade = (req, res) => {
  let { id } = req.body.userDetails;
  let pid = req.body._id;
  PossibleTradesModel.deleteOne({ _id: pid, userId: id }, (err, response) => {
    if (err) return res.send(500, { error: err });
    return res.json({
      success: true,
      message: "Deleted",
      data: [],
    });
  });
};

const fetchBookedTradeDetails = async (id) => {
  try {
    let bookedTrade = await BookTradesModel.find({
      userId: id,
    });
    return bookedTrade;
  } catch (e) {
    return false;
  }
};

module.exports = {
  savePossibleTrade,
  getPossibleTrades,
  updatePossibleTrade,
  deletePossibleTrade,
};
