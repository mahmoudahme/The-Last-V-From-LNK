import Admin from "../../model/User/Admin.js";
import User from "../../model/User/User.js";
import { ApiError } from "../../Utils/apiError.js";
import bcrypt from "bcrypt";

import Randomstring from "randomstring";
function generateOTP() {
  return Randomstring.generate({
    length: 4,
    charset: "numeric",
  });
}
//Admins EndPoinst

export const createUser = async (req, res, next) => {
  try {
    const { typeOfUser, name, email, phone, password, city, address, place } =
      req.body;
    const existUser = await User.findOne({email : email});
    if(existUser){
      return next(new ApiError(`Email is Used` , 400))
    }
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      typeOfUser: typeOfUser,
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      otp: otp,
      received : otp , 
      city: city,
      address: address,
      place: place
    });
    await newUser.save();
    res.status(200).json({ message: "User Created Successfully"  , data : newUser});

  } catch (error) {
    return next(new ApiError(`Server Error`, 500));
  }
};

export const getAllAdmin = async (req, res, next) => {
  try {
    if (req.admin.type == "Main") {
      const Admins = await Admin.find();
      res.status(200).json({ Admins: Admins });
    } else {
      return res
        .status(200)
        .json({ Message: "Sorry You Are Not Authorized To Use It" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getOneAdmin = async (req, res, next) => {
  try {
    if (req.admin.type == "Main") {
      const AdminId = req.params.id;
      const admin = await Admin.findById(AdminId);
      if (!admin) {
        return next(new ApiError(`Admin Not Found`, 404));
      }
      res.status(200).json({ Admin: admin });
    } else {
      return res
        .status(200)
        .json({ Message: "Sorry You Are Not Authorized To Use It" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const updateAdminData = async (req, res, next) => {
  try {
    if (req.admin.type == "Main") {
      const AdminId = req.params.id;
      const admin = await Admin.findByIdAndUpdate(AdminId, req.body, {
        new: true,
      });
      res
        .status(200)
        .json({ Message: "Admin Updated Successfully !", Admin: admin });
    } else {
      return res
        .status(200)
        .json({ Message: "Sorry You Are Not Authorized To Use It" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const adminID = req.params.id;
    const admin = await Admin.findByIdAndDelete(adminID);
    res.status(200).json({ Message: "Admin Deleted Successfully !" });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

//Freelancers EndPoinst
export const getAllSoloAccounts = async (req, res, next) => {
  try {
    const freelancerAccounts = await User.find({ typeOfUser: "freelancer" })
    .populate({path:"city" ,  select : "-_id cityNameEn cityNameAr"})
    .populate({path:"address" ,  select : "-_id nameAr nameEn"});
    res.status(200).json({ freelancers: freelancerAccounts });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getFreelanceAccountById = async (req, res, next) => {
  try {
    const freelancerId = req.params.id;
    const freelancerAccount = await User.findById(freelancerId)
    .populate({path  : "city" ,  select : "-_id cityNameEn cityNameAr"})
    .populate({path  : "address" ,  select : "-_id nameAr nameEn"});
    res.status(200).json({ freelancer: freelancerAccount });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

//Agency EndPoinst
export const getAllAgencyAccounts = async (req, res, next) => {
  try {
    const AgencyAccounts = await User.find({ typeOfUser: "agency" })
    .populate({path  : "city" ,  select : "-_id cityNameEn cityNameAr"})
    .populate({path  : "address" ,  select : "-_id nameAr nameEn"});
    res.status(200).json({ Agency: AgencyAccounts });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getAgencyAccountById = async (req, res, next) => {
  try {
    const AgencyId = req.params.id;
    const AgencyAccount = await User.findById(AgencyId)
    .populate({path  : "city" ,  select : "-_id cityNameEn cityNameAr"})
    .populate({path  : "address" ,  select : "-_id nameAr nameEn"});
    res.status(200).json({ Agency: AgencyAccount });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getAllAccounts = async (req, res, next) => {
  try {
    const freelancerAccounts = await User.find()
    .populate({path  : "city" ,  select : "-_id cityNameEn cityNameAr"})
    .populate({path  : "address" ,  select : "-_id nameAr nameEn"});
    res.status(200).json({ Accounts: freelancerAccounts });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const updateActivation = async (req, res, next) => {
  try {
    const { activation } = req.body;
    const userId = req.params.id;
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { activation: activation },
      { new: true }
    );
    res.status(200).json({
      Message: "Activation status updated successfully",
      user: userUpdate,
    });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const updateUserData = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    ).populate({path  : "city" ,  select : "-_id cityNameEn cityNameAr"})
    .populate({path  : "address" ,  select : "-_id nameAr nameEn"});
    res.status(200).json({
      Message: "Activation status updated successfully",
      user: userUpdate,
    });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const deleteAnyUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userDelete = await User.findByIdAndDelete(userId);
    res.status(200).json({ Message: "User deleted successfully" });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};
