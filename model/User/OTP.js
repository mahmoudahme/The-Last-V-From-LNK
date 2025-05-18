// models/otpModel.js

// const mailSender = require('../utils/mailSender');
import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, 
  },
});
export default mongoose.model("OTP", otpSchema);