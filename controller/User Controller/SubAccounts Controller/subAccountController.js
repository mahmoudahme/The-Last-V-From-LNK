import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import {mailSender} from "../../../Utils/mailSender.js";
import bcrypt from "bcrypt";
import { StatusCode } from "../authController.js";
import Randomstring from "randomstring";

function generateOTP() {
  return Randomstring.generate({
    length: 4,
    charset: "numeric",
  });
}
export const createSubAccount = async (req, res, next) => {
  try {
    //get User Id  and Check If He Agency or not
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return next(new ApiError("User Not Found", StatusCode.NOT_FOUND));
    if (!user.typeOfUser == "agency")
      return next(
        ApiError(
          "You Must Be Agency To Create Sub Account",
          StatusCode.FORBIDDEN
        )
      );
    //check Email of sunAccount 
    const { name, email, phone, password, locations } = req.body;
     const Existuser = await User.findOne({ $or: [{ email }, { phone }] });
     if(Existuser) return next(new ApiError("Email or Phone Already Exist", StatusCode.FORBIDDEN));
    //get Agency Id
    const agencyId = user._id;
    
    const otp = generateOTP();
    await mailSender({
      to: email,
      subject: "Invitation For Using LNK From Your Agency",
      message: `<h1>This is Your Data </h1>
      <p>Email: ${email} </p>
      <p>Password: ${password} </p>`,
    });
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create new user
    const newSubUser = new User({
      typeOfUser: "subAccount",
      image: "" ,
      name,
      email,
      phone,
      password: hashedPassword,
      locations : user.locations,
      UserId: agencyId,
      otp: otp,
      received: otp,
    });
    await newSubUser.save();
    res.status(StatusCode.CREATED).json({Message : `Invitation sent to ${email}`})
  } catch (error) {
    return next(
      new ApiError(`Server Error ${error}`, StatusCode.INTERNAL_SERVER_ERROR)
    );
  }
};

export const getMySubAccounts = async (req, res, next) => {
  try {
    //get User Id  and Check If He Agency or not
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return next(new ApiError("User Not Found", StatusCode.NOT_FOUND));
    if (!user.typeOfUser == "agency")
      return next(
        new ApiError(
          "You Must Be Agency To Create Sub Account",
          StatusCode.FORBIDDEN
        )
      );
    //get Agency Id
    const agencyId = user._id;
    //get all sub accounts
    const subAccounts = await User.find({ UserId: agencyId });
    res.status(StatusCode.OK).json({subAccounts : subAccounts});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, StatusCode.INTERNAL_SERVER_ERROR));
  }
};

export const getSubAccountById = async (req, res, next) => {
  try {
    //get User Id  and Check If He Agency or not
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return next(ApiError("User Not Found", StatusCode.NOT_FOUND));
    if (!user.typeOfUser == "agency")
      return next(
        ApiError(
          "You Must Be Agency To Create Sub Account",
          StatusCode.FORBIDDEN
        )
      );
    //get Agency Id
    const agencyId = user._id;
    //get all sub accounts
    const subAccount = await User.findById(req.params.id);
    if (!subAccount) return next(ApiError("Sub Account Not Found", StatusCode.NOT_FOUND));
    res.status(StatusCode.OK).json({subAccount : subAccount});
  } catch (error) {
    return next(
      new ApiError(`Server Error ${error}`, StatusCode.INTERNAL_SERVER_ERROR)
    );
  }
};

export const deleteSubAccount = async (req, res, next) => {
  try {
    //get User Id  and Check If He Agency or not
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return next(new ApiError("User Not Found", StatusCode.NOT_FOUND));
    if (!user.typeOfUser == "agency")
      return next(
        new ApiError(
          "You Must Be Agency To Create Sub Account",
          StatusCode.FORBIDDEN
        )
      );
    //get Agency Id
    const agencyId = user._id;
    //get all sub accounts
    const subAccount = await User.findByIdAndDelete(req.params.id);
    if (!subAccount) return next(new ApiError("Sub Account Not Found", StatusCode.NOT_FOUND));
    res.status(StatusCode.OK).json({Message : "Sub Account Deleted Successfully"});
  } catch (error) {
    return next(
      new ApiError(`Server Error ${error}`, StatusCode.INTERNAL_SERVER_ERROR)
    );
  }
}
