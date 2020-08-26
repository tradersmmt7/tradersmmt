const { BookTradesModel, getFields } = require("./BookedTradesSchema");
const { updateStatusPortfolio } = require("./../authUserModel");

const saveBookedTrade = (req, res) => {
  let entryDate = req.body.entryDate;
  let exitDate = req.body.exitDate;
  let script = req.body.script;
  let longOrShort = req.body.longOrShort === "long" ? "Long" : "Short";
  let entryPrice = parseInt(req.body.entryPrice);
  let quantity = parseInt(req.body.quantity);
  let initialStopLoss = parseInt(req.body.initialStopLoss);
  let exitPrice = parseInt(req.body.exitPrice);
  let charges = parseInt(req.body.charges);
  if (
    !isNaN(entryPrice) &&
    !isNaN(quantity) &&
    !isNaN(initialStopLoss) &&
    !isNaN(exitPrice) &&
    !isNaN(charges) &&
    script &&
    exitDate &&
    entryDate &&
    longOrShort
  ) {
    let entryValue = entryPrice * quantity;
    let exitValue = exitPrice * quantity;
    let absPandL =
      longOrShort === "Long" ? exitValue - entryValue : entryValue - exitValue;
    let initialRiskTaken = Math.abs(entryPrice - initialStopLoss) * quantity;

    let finalObj = {
      userId: req.body.userDetails.id,
      entryPrice,
      quantity,
      initialStopLoss,
      exitPrice,
      script,
      exitDate,
      entryDate,
      longOrShort,
      entryValue,
      exitValue,
      absPandL,
      initialRiskTaken,
      rrr: absPandL / initialRiskTaken,
      charges,
    };

    BookTradesModel.create(finalObj, (err, result) => {
      if (err) {
        throw err;
      }
      updateStatusPortfolio(req.body.userDetails.id);
      res.json({
        success: true,
        message: "Booked Trade Added Successfully",
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

const fetchBookedTrades = (req, res) => {
  BookTradesModel.find({ userId: req.body.userDetails.id }, (err, result) => {
    res.json({
      success: true,
      message: "Data fetched",
      data: result,
    });
  });
};

const deleteBookedTrades = (req, res) => {
  let { id } = req.body.userDetails;
  let pid = req.body._id;
  BookTradesModel.deleteOne({ _id: pid, userId: id }, (err, resp) => {
    if (err) return res.send(500, { error: err });
    return res.json({
      success: true,
      message: "Deleted",
      data: [],
    });
  });
};

const updateBookedTrade = (req, res) => {
  let entryDate = req.body.entryDate;
  let exitDate = req.body.exitDate;
  let script = req.body.script;
  let longOrShort = req.body.longOrShort === "long" ? "Long" : "Short";
  let entryPrice = parseInt(req.body.entryPrice);
  let quantity = parseInt(req.body.quantity);
  let initialStopLoss = parseInt(req.body.initialStopLoss);
  let exitPrice = parseInt(req.body.exitPrice);
  let charges = parseInt(req.body.charges);
  if (
    !isNaN(entryPrice) &&
    !isNaN(quantity) &&
    !isNaN(initialStopLoss) &&
    !isNaN(exitPrice) &&
    !isNaN(charges) &&
    script &&
    exitDate &&
    entryDate &&
    longOrShort
  ) {
    let entryValue = entryPrice * quantity;
    let exitValue = exitPrice * quantity;
    let absPandL =
      longOrShort === "Long" ? exitValue - entryValue : entryValue - exitValue;
    let initialRiskTaken = Math.abs(entryPrice - initialStopLoss) * quantity;
    let finalObj = {
      userId: req.body.userDetails.id,
      entryPrice,
      quantity,
      initialStopLoss,
      exitPrice,
      script,
      exitDate,
      entryDate,
      longOrShort,
      entryValue,
      exitValue,
      absPandL,
      initialRiskTaken,
      rrr: absPandL / initialRiskTaken,
      charges,
    };
    BookTradesModel.findOneAndUpdate(
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
  saveBookedTrade,
  fetchBookedTrades,
  deleteBookedTrades,
  updateBookedTrade,
};
