const express = require("express");
const app = express();
const port = require("./properties").PORT;
const cors = require("cors");
const UserController = require("./controller/UserController/UserController.js");
const AuthUserController = require("./controller/AuthUserController/AuthUserController.js");
require("./connection");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", UserController);
app.use("/api/user", AuthUserController);

app.listen(port, function () {
  console.log("Server started on port: " + port);
});