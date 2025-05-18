import bcrypt from "bcrypt";
import { ApiError } from "../../Utils/apiError.js";
import JsonWebToken from "jsonwebtoken";
import User from "../../model/User/User.js";
import OTP from "../../model/User/OTP.js";
// import subAccount from '../model/User/subAccounts.js'
import Logger from "../../Services/logger.js";
const logger = new Logger("AuthControllers");
import dotenv from "dotenv";
import { mailSender } from "../../Utils/mailSender.js";
dotenv.config({ path: "config/config.env" });
import Randomstring from "randomstring";

export const StatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_ACCEPTABLE: 500,
};
///////////////////////////////////REGISTER TO SYSTEM ////////////////////////////////////////////////
function generateOTP() {
  return Randomstring.generate({
    length: 4,
    charset: "numeric",
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email: email });
    const existOtp = await OTP.findOne({ email: email });
    if (user && existOtp) {
      if (existOtp.otp == otp) {
        await User.findByIdAndUpdate(user.id, { received: otp, otp: otp }, { new: true });
        await OTP.findByIdAndDelete(existOtp.id);
        res
          .status(StatusCode.OK)
          .json({ success: true, Message: "OTP verification successful" });
      } else {
        res.status(StatusCode.BAD_REQUEST).json({ success: false, Message: "Invalid OTP" });
      }
    } else if (user) {
      if (user.otp == otp) {
        await User.findByIdAndUpdate(user.id, { received: otp }, { new: true });
        res
          .status(StatusCode.OK)
          .json({ Message: "Your account is active now"});
      } else {
        res.status(400).json({ Message: "Invalid OTP , please try Again " });

      }
    }
  } catch (error) {
    return next(new ApiError(`System Error ${error}`, StatusCode.INTERNAL_SERVER_ERROR));
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, city, address, locations, typeOfUser } = req.body;
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      if (user.otp === user.received) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          Message: "This email or phone number is already used.",
        });
      } else {
        const otp = generateOTP();
        await mailSender({
          to: email,
          subject: "Verification Email",
          message: `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp}</p>`,
        });
        await User.findByIdAndUpdate(user._id, { name, email, phone, password, city, address, locations, typeOfUser }, { new: true });
        await User.findByIdAndUpdate(user._id, { otp }, { new: true });
        return res.status(StatusCode.CREATED).json({
          success: true,
          Message: "OTP sent successfully",
        });
      }
    }
    const otp = generateOTP();
    await mailSender({
      to: email,
      subject: "Verification Email",
      message: `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp}</p>`,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      typeOfUser: typeOfUser,
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      city: city,
      address: address,
      locations: locations,
      otp: otp,
      image: ""
    });
    await newUser.save();
    return res.status(StatusCode.CREATED).json({
      success: true,
      Message: "New user created",
      userdata: newUser,
    });
  } catch (error) {
    return next(new ApiError(`System Error ${error}`, StatusCode.INTERNAL_SERVER_ERROR));
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ phone: req.body.phone }).populate({
      path: "UserId",
      select: "name-_id",
    });
    if (!user) {
      return next(new
        ApiError("User not found!", StatusCode.NOT_FOUND));
    } else {
      if (user.otp == user.received) {
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect) {
          return next(new ApiError("password isn't correct", StatusCode.UNAUTHORIZED));
        }

        const token = JsonWebToken.sign(
          { id: user._id },
          process.env.JWT
        );
        const { password, isAdmin, ...otherDetails } = user._doc;
        logger.info("User LogIn");
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "lax",
          })
          .status(StatusCode.OK)
          .json({ details: { ...otherDetails }, token: token });
      } else {
        return next(new ApiError("You Should verify your account", StatusCode.UNAUTHORIZED));
      }
    }
  } catch (error) {
    return next(new ApiError(`System Error ${error}`, StatusCode.INTERNAL_SERVER_ERROR));
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////
export const logout = async (req, res, next) => {
  try {
    res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
///////////////////////////////////////////////////////////////
export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email: email });
    const userExistInOTP = await OTP.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({ Message: "User not Found" });
    }
    const otp = generateOTP();
    if (!userExistInOTP) {
      const newOTP = new OTP({ email, otp });
      await newOTP.save();
    } else {
      await OTP.findByIdAndUpdate(userExistInOTP._id, { otp }, { new: true });
    }
    await mailSender({
      to: email,
      subject: "Verification Email",
      message: `<h1>Please confirm your OTP</h1>
               <p>Here is your OTP code: ${otp}</p>`,
    });
    res.status(200).json({ Message: `We sent an OTP to your account ${email}` });
  } catch (error) {
    next(new ApiError(`System Error ${error}`, 500));
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////

export const changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userAccount = await User.findOne({ email: email });
    const newDateforUser = await User.findByIdAndUpdate(userAccount.id, {
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ Message: "Your Passwprd is Updated", UserData: newDateforUser });
  } catch (error) {
    return next(new ApiError("System Error", 404));
  }
};

export const getAllOTPs = async (req, res, next) => {
  try {
    const otps = await OTP.find();
    if (!otps) {
      return res.status(404).json({ Message: "No OTPs found" });
    }
    res.status(200).json({ Message: "All OTPs", otps });
  } catch (error) {
    return next(new ApiError("System Error", 500));
  }
};
////////////////////////////Mahmoud Ahmed Saeed ///////////////////////////////////
