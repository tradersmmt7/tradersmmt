const express = require("express");
const router = express.Router();
const AuthUserModel = require("../../model/AuthUserModel/authUserModel");
const PossibleTradesModel = require("../../model/AuthUserModel/PossibleTrades/PossibleTradeModel");
const BookedTradesModel = require("../../model/AuthUserModel/BookedTrades/BookedTradesModel");
const jwt = require("jsonwebtoken");
const OpenTradesModel = require("../../model/AuthUserModel/OpenTrades/OpenTradesModel");
const SECRET_KEY = require("../../properties").tokenKey;

const shortid = require("shortid");
const Razorpay = require("razorpay");
const TransactionModel = require("../../model/AuthUserModel/transactionSchema");

router.use((req, res, next) => {
  jwt.verify(req.headers["authorization"], SECRET_KEY, (err, result) => {
    if (result) {
      AuthUserModel.fetchUserDetails(req, res, next, result);
    } else {
      res.json({
        success: false,
        data: err,
        message: "Invalid Token",
      });
    }
  });
});

router.get("/details", (req, res) => {
  AuthUserModel.userDetails(req, res);
});

router.post("/update/portfolioStats", (req, res) => {
  AuthUserModel.updatePortfolioStats(req, res);
});

router.get("/fetch/possibleTrade", (req, res) => {
  PossibleTradesModel.getPossibleTrades(req, res);
});

router.post("/save/possibleTrade", (req, res) => {
  PossibleTradesModel.savePossibleTrade(req, res);
});

router.post("/update/possibleTrade", (req, res) => {
  PossibleTradesModel.updatePossibleTrade(req, res);
});

router.post("/delete/possibleTrade", (req, res) => {
  PossibleTradesModel.deletePossibleTrade(req, res);
});

router.post("/save/bookedTrade", (req, res) => {
  BookedTradesModel.saveBookedTrade(req, res);
});

router.get("/fetch/bookedTrade", (req, res) => {
  BookedTradesModel.fetchBookedTrades(req, res);
});

router.post("/delete/bookedTrade", (req, res) => {
  BookedTradesModel.deleteBookedTrades(req, res);
});

router.post("/update/bookedTrade", (req, res) => {
  BookedTradesModel.updateBookedTrade(req, res);
});

router.post("/save/openTrade", (req, res) => {
  OpenTradesModel.saveOpenTrade(req, res);
});

router.get("/fetch/openTrade", (req, res) => {
  OpenTradesModel.fetchOpenTrades(req, res);
});

router.post("/delete/openTrade", (req, res) => {
  OpenTradesModel.deleteOpenTrades(req, res);
});

router.post("/update/openTrade", (req, res) => {
  OpenTradesModel.updateOpenTrade(req, res);
});

const razorpay = new Razorpay({
  key_id: "rzp_live_u0nUhfJHkn8ck2",
  key_secret: "SqrpDhpBfcKTF9lzE0NzAkLq",
});

router.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 137;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/razorpay/success",  (req, res) => {
  let { payId, userDetails } = req.body;
  let date =  new Date();
  if (payId) {
    let obj = {
      userId: userDetails.id,
      transactionId: payId,
      startDate: date,
      endDate: date.setDate(date.getDate() + 30),
    };
    TransactionModel.create(obj, (err, result) => {
      if(err){
        console.log(err);
      }else{
        AuthUserModel.updateSubscriptionStatus(req.body,date,res);
      }
    });
  } else {
    res.json({
      data: [],
      success: false,
      message: "Payment Failed! Please try again sometime.",
    });
  }

});

module.exports = router;
