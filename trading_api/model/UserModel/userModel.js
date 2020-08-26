const usersModel = require("./usersSchema.js");
const { generateJWTToken } = require("../../UtilFunctions/helpers.js");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const total = await usersModel.find({});
  return total.length + 1;
};

const login = (req, res) => {
  let { emailId, password } = req.body;
  usersModel.find({ emailId }, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: "Invalid email-id",
        data: [],
      });
    }
    if (user.length) {
      bcrypt.compare(password, user[0].password, (err, response) => {
        if (response) {
          let payload = {
            fullName: user[0].fullName,
            emailId: user[0].emailId,
            userId: user[0].userId,
          };
          const userToken = generateJWTToken(payload);
          res.json({
            success: true,
            message: "Login Success",
            data: [
              {
                token: userToken,
                userId: user[0].userId,
              },
            ],
          });
        } else {
          res.json({
            success: false,
            message: "Invalid Password",
            data: [],
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Email-ID",
        data: [],
      });
    }
  });
};

const register = async (req, res) => {
  let d = new Date();
  let saveObject = {
    fullName: req.body.fullName,
    emailId: req.body.emailId,
    password: req.body.password,
    phone: req.body.phone,
    userId: (await getAllUsers()) + "/" + d.getTime(),
  };

  usersModel.find({ emailId: saveObject.emailId }, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: err,
        data: [],
      });
    }
    if (result.length) {
      res.json({
        success: false,
        message: "Email-ID already Exits",
        data: [],
      });
    } else {
      bcrypt.hash(saveObject.password, 10, (err, hash) => {
        if (err) {
          res.json({
            success: false,
            message: "Please provide all the fields",
            data: [],
          });
        }
        if (hash) {
          saveObject.password = hash;
          usersModel.create(saveObject, (err, resp) => {
            if (err) {
              res.json({
                success: false,
                message: err,
                data: [],
              });
            } else {
              res.json({
                success: true,
                message: "Registration Success",
                data: [],
              });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  login,
  register,
};
