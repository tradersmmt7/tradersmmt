const OpenTradesModel = require("./OpenTradesSchema");

const { updateStatusPortfolio } = require("./../authUserModel");

const saveOpenTrade = (req, res) => {
  let entryDate = req.body.entryDate;
  let script = req.body.script;
  let longOrShort = req.body.longOrShort === "long" ? "Long" : "Short";
  let entryPrice = parseInt(req.body.entryPrice);
  let quantity = parseInt(req.body.quantity);
  let initialStopLoss = parseInt(req.body.initialStopLoss);
  let currentStopLoss = parseInt(req.body.currentStopLoss);
  let target = req.body.target;
  let cmp = parseInt(req.body.cmp);
  if (
    !isNaN(entryPrice) &&
    !isNaN(quantity) &&
    !isNaN(initialStopLoss) &&
    !isNaN(currentStopLoss) &&
    !isNaN(cmp) &&
    script &&
    entryDate &&
    longOrShort &&
    target
  ) {
    let finalObj = {
      userId: req.body.userDetails.id,
      entryDate,
      script,
      longOrShort,
      entryPrice,
      quantity,
      initialStopLoss,
      currentStopLoss,
      target,
      cmp,
      absRet:
        longOrShort === "Long"
          ? (cmp - entryPrice) * quantity
          : (entryPrice - cmp) * quantity,
    };
    OpenTradesModel.create(finalObj, (err, result) => {
      if (err) {
        throw err;
      }
      
      updateStatusPortfolio(req.body.userDetails.id);
      res.json({
        success: true,
        message: "Open Trade Added Successfully",
        data: [],
      });
    });
  } else {
    res.json({
      success: false,
      message: "Invalid entries",
      data: [],
    });
  }
};

const fetchOpenTrades = (req, res) => {
  OpenTradesModel.find({ userId: req.body.userDetails.id }, (err, result) => {
    res.json({
      success: true,
      message: "Data fetched",
      data: result,
    });
  });
};

const deleteOpenTrades = (req, res) => {
  let { id } = req.body.userDetails;
  let pid = req.body._id;
  OpenTradesModel.deleteOne({ _id: pid, userId: id }, (err, resp) => {
    if (err) return res.send(500, { error: err });
    return res.json({
      success: true,
      message: "Deleted",
      data: [],
    });
  });
};

const updateOpenTrade = (req, res) => {
  let entryDate = req.body.entryDate;
  let script = req.body.script;
  let longOrShort = req.body.longOrShort === "long" ? "Long" : "Short";
  let entryPrice = parseInt(req.body.entryPrice);
  let quantity = parseInt(req.body.quantity);
  let initialStopLoss = parseInt(req.body.initialStopLoss);
  let currentStopLoss = parseInt(req.body.currentStopLoss);
  let target = req.body.target;
  let cmp = parseInt(req.body.cmp);

  if (
    !isNaN(entryPrice) &&
    !isNaN(quantity) &&
    !isNaN(initialStopLoss) &&
    !isNaN(currentStopLoss) &&
    !isNaN(cmp) &&
    script &&
    entryDate &&
    longOrShort &&
    target
  ) {
    //calculation check needed
    let finalObj = {
      userId: req.body.userDetails.id,
      entryDate,
      script,
      longOrShort,
      entryPrice,
      quantity,
      initialStopLoss,
      currentStopLoss,
      target,
      cmp,
      absRet:
        longOrShort === "Long"
          ? (cmp - entryPrice) * quantity
          : (entryPrice - cmp) * quantity,
    };
    OpenTradesModel.findOneAndUpdate(
      { _id: req.body._id },
      finalObj,
      { upsert: true },
      (err, result) => {
        if (err) {
          throw err;
        }
        updateStatusPortfolio(req.body.userDetails.id);
        res.json({
          success: true,
          message: "Booked Trade updated Successfully",
          data: [],
        });
      }
    );
  } else {
    res.json({
      success: false,
      message: "Invalid entries",
      data: [],
    });
  }
};

module.exports = {
  saveOpenTrade,
  fetchOpenTrades,
  deleteOpenTrades,
  updateOpenTrade,
};
