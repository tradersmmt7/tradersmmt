//Define a schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    emailId: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    referralId: { type: String },
    subscriptionStartDate: { type: Date, default: null },
    subscriptionEndDate: { type: Date, default: null },
    transactionId: { type: String, default: null },
    subscriptionStatus: { type: Boolean, default: 0 },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", usersSchema);
module.exports = usersModel;
