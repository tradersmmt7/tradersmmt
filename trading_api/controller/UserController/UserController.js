const express = require("express");
const router = express.Router();
const usersModel = require("../../model/UserModel/userModel.js");

router.post("/login", (req, res) => {
    usersModel.login(req,res);
});

router.post("/register", (req, res) => {
    usersModel.register(req,res);
});

module.exports = router;