const usersModel = require("../UserModel/usersSchema.js");
const portFolioStatsModel = require("./PortfolioStats/PortfolioStatsSchema");
const OpenTradesModel = require("./OpenTrades/OpenTradesSchema");
const { BookTradesModel } = require("./BookedTrades/BookedTradesSchema");

const updateSubscriptionStatus = async (data, date, res) => {
  let { payId, userDetails } = data;

  let updated = {
    subscriptionStartDate: date,
    subscriptionEndDate: date.setDate(date.getDate() + 30),
    transactionId: payId,
    subscriptionStatus: true,
  };

  await usersModel.update(
    { userId: userDetails.userId },
    { $set: updated },
    (err, result) => {
      if (err) {
        res.json({
          data: [],
          message: "",
          success: false,
        });
      } else {
        res.json({
          data: [],
          message: "Successfully Subscribed for next 10 days",
          success: true,
        });
      }
    }
  );
};

const updateStatusPortfolio = async (userid) => {
  try {
    let portfolioStats = await portFolioStatsModel.find({
      userId: userid,
    });

    let ps = portfolioStats[0];

    let updateObj = {
      startingCapital: ps.startingCapital,
      worstCaseScenario: ps.worstCaseScenario,
      worstCaseScenarioData: ps.worstCaseScenarioData,
      riskPerTrade: ps.riskPerTrade,
      riskPerTradeData: ps.riskPerTradeData,
      openPandL: ps.openPandL,
      bookedPandL: ps.bookedPandL,
      currentCapital: ps.currentCapital,
      withdraw: ps.withdraw,
      charges: ps.charges,
    };

    // Calculating worst case data
    updateObj.worstCaseScenarioData =
      (updateObj.worstCaseScenario * updateObj.startingCapital) / 100;

    // Calculating worst case data
    updateObj.worstCaseScenarioData =
      (updateObj.worstCaseScenario * updateObj.startingCapital) / 100;

    let openTradeDetails = await fetchOpenTradeDetails(userid);

    let bookTradeDetails = await fetchBookedTradeDetails(userid);

    if (openTradeDetails.length) {
      openTradeDetails.forEach((val, i) => {
        updateObj.openPandL += parseInt(val.absRet);
      });
    }
    if (bookTradeDetails.length) {
      bookTradeDetails.forEach((val, i) => {
        updateObj.bookedPandL += parseInt(val.absPandL);
        updateObj.charges += parseInt(val.charges);
      });
    }

    updateObj.currentCapital =
      updateObj.startingCapital +
      updateObj.openPandL +
      updateObj.bookedPandL -
      updateObj.withdraw -
      updateObj.charges;

    updateObj.riskPerTradeData =
      (updateObj.riskPerTrade * updateObj.currentCapital) / 100;

    portFolioStatsModel.findOneAndUpdate(
      { userId: userid },
      updateObj,
      (err, place) => {}
    );
  } catch (e) {
    return false;
  }
};

const fetchUserDetails = (req, res, next, result) => {
  let { userId, emailId } = result;
  usersModel.find({ emailId, userId }, (err, response) => {
    if (err) {
      res.json({
        success: false,
        message: err,
        data: [],
      });
    } else {
      req.body.userDetails = {
        ...result,
        id: response[0]._id,
      };
      next();
    }
  });
};

const userDetails = (req, res) => {
  let { userId, emailId } = req.body.userDetails;
  usersModel.find({ emailId, userId }, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: err,
        data: [],
      });
    } else {
      let { subscriptionEndDate, userId } = result[0];
      let date = new Date();
      if (subscriptionEndDate < date) {
        let updated = {
          subscriptionStartDate: null,
          subscriptionEndDate: null,
          transactionId: null,
          subscriptionStatus: false,
        };
        usersModel.update({ userId }, { $set: updated }, async (err, ree) => {
          if (err) {
            res.json({
              data: [],
              message: "Please Try Again Later!",
              success: false,
            });
          } else {
            let u = await usersModel.find({ userId: userId });
            fetchPortolio(u[0], res);
          }
        });
      } else {
        fetchPortolio(result[0], res);
      }
    }
  });
};

const fetchPortolio = (result, res) => {
  let {
    fullName,
    phone,
    subscriptionEndDate,
    emailId,
    subscriptionStatus,
    _id,
  } = result;
  portFolioStatsModel.find({ userId: _id }, (err, response) => {
    if (err) {
      res.json({
        success: false,
        message: err,
        data: [],
      });
    } else {
      let dataToSend = {
        fullName,
        emailId,
        subscriptionStatus,
        phone,
        subscriptionEndDate,
        portfolioStats:
          response.length > 0
            ? [
                {
                  bookedPandL: response[0].bookedPandL,
                  currentCapital: response[0].currentCapital,
                  openPandL: response[0].openPandL,
                  riskPerTrade: response[0].riskPerTrade,
                  riskPerTradeData: response[0].riskPerTradeData,
                  startingCapital: response[0].startingCapital,
                  worstCaseScenario: response[0].worstCaseScenario,
                  withdraw: response[0].withdraw,
                  charges: response[0].charges,
                  worstCaseScenarioData: response[0].worstCaseScenarioData,
                  id: response[0]._id,
                  startingCapital: response[0].startingCapital,
                },
              ]
            : [],
      };
      res.json({
        success: true,
        message: "Success",
        data: [dataToSend],
      });
    }
  });
};

const updatePortfolioStats = async (req, res) => {
  let riskPerTrade = parseInt(req.body.riskPerTrade);
  let startingCapital = parseInt(req.body.startingCapital);
  let worstCaseScenario = parseInt(req.body.wcs);
  let withdraw = parseInt(req.body.withdraw);
  if (
    !isNaN(riskPerTrade) &&
    !isNaN(startingCapital) &&
    !isNaN(worstCaseScenario) &&
    !isNaN(withdraw)
  ) {
    let saveObject = {
      userId: req.body.userDetails.id,
      startingCapital,
      worstCaseScenario,
      worstCaseScenarioData: 0,
      riskPerTrade,
      riskPerTradeData: 0,
      openPandL: 0, // sum of absRet in Open Trades
      bookedPandL: 0, // sum of abs p and l in booked trades
      currentCapital: 0, // sum of openPandL + bookedPandL + startingCapital
      withdraw,
      charges: 0,
    };

    // Calculating worst case data
    saveObject.worstCaseScenarioData =
      (saveObject.worstCaseScenario * startingCapital) / 100;

    // Calculating worst case data
    saveObject.worstCaseScenarioData =
      (saveObject.worstCaseScenario * startingCapital) / 100;

    let openTradeDetails = await fetchOpenTradeDetails(req.body.userDetails.id);

    let bookTradeDetails = await fetchBookedTradeDetails(
      req.body.userDetails.id
    );

    if (openTradeDetails.length) {
      openTradeDetails.forEach((val, i) => {
        saveObject.openPandL += parseInt(val.absRet);
      });
    }
    if (bookTradeDetails.length) {
      bookTradeDetails.forEach((val, i) => {
        saveObject.bookedPandL += parseInt(val.absPandL);
        saveObject.charges += parseInt(val.charges);
      });
    }

    saveObject.currentCapital =
      saveObject.startingCapital +
      saveObject.openPandL +
      saveObject.bookedPandL -
      saveObject.withdraw -
      saveObject.charges;

    saveObject.riskPerTradeData =
      (saveObject.riskPerTrade * saveObject.currentCapital) / 100;

    let portfolioStatsDetails = await fetchPortfolioStatsDetails(
      req.body.userDetails.id
    );
    if (portfolioStatsDetails.length) {
      // UPDATE A NEW RECORD
      portFolioStatsModel.findOneAndUpdate(
        { userId: req.body.userDetails.id },
        saveObject,
        (err, place) => {
          if (err) {
            res.json({
              success: false,
              message: err,
              data: [],
            });
          } else {
            res.json({
              success: true,
              message: "Portfolio Updated",
              data: [],
            });
          }
        }
      );
    } else {
      // CREATE A NEW RECORD
      portFolioStatsModel.create(saveObject, (err, resp) => {
        if (err) {
          res.json({
            success: false,
            message: err,
            data: [],
          });
        } else {
          res.json({
            success: true,
            message: "Portfolio Created",
            data: [],
          });
        }
      });
    }
  } else {
    res.json({
      success: false,
      message: "Invalid entries",
      data: [],
    });
  }
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

const fetchPortfolioStatsDetails = async (id) => {
  try {
    let portfolioStats = await portFolioStatsModel.find({
      userId: id,
    });
    return portfolioStats;
  } catch (e) {
    return false;
  }
};

const fetchOpenTradeDetails = async (id) => {
  try {
    let openTrade = await OpenTradesModel.find({
      userId: id,
    });
    return openTrade;
  } catch (e) {
    return false;
  }
};

module.exports = {
  userDetails,
  updatePortfolioStats,
  fetchUserDetails,
  updateStatusPortfolio,
  updateSubscriptionStatus,
};
