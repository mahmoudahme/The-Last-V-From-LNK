import Admin from "../../model/User/Admin.js";
import { ApiError } from "../../Utils/apiError.js";
import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: "config/config.env" });

export const register = async (req, res, next) => {
  try {
    const adminType = req.admin.type ;
    if(adminType == "Main"){
      const { name, email, password , role} = req.body;
      const admin = await Admin.findOne({ email: email });
      if (admin) {
        return next(new ApiError(`Email is Used Before`, 403));
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({ name, email, password: hashedPassword , role});
        await newAdmin.save();
        res
          .status(201)
          .json({ message: "Admin Created Successfully", Data: newAdmin });
      }
    }else{
      return res.status(401).json({Message : "Sorry You Are Not Authorized To Create Admin" });
    }
    
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return next(new ApiError(`Email is Not Found`, 404));
    } else {
      const passwordCorrect = await bcrypt.compare(password , admin.password);
      if (passwordCorrect) {
        const token = JsonWebToken.sign(
          { id: admin._id, type: admin.role },
          process.env.JWT
        );
        const { password, ...otherDetails } = admin._doc;
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "lax",
          })
          .status(200)
          .json({ details: { ...otherDetails }, token: token });
      } else {
        return next(new ApiError(`Password is Incorrect`, 401));
      }
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear the token from the cookies
    res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAdmin = async(req , res , next)=>{
  try {
    const adminID = req.admin.id;
    const admin = await Admin.findById(adminID);
    res.status(200).json({admin : admin})
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
}
