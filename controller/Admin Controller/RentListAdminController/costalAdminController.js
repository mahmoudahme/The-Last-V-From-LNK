import costalRent from "../../../model/Rent/costalRent.js";
import { ApiError } from "../../../Utils/apiError.js";

// Get All For Costal Rents
export const getAllRents = async (req, res, next) => {
  try {
    const costalRents = await costalRent.find();
    res.status(200).json({ costalRents: costalRents });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getOneRent = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const Rent = await costalRent.findById(id);
    if(Rent){
      return res.status(200).json({Rent : Rent})
    }else{
      return res.status(404).json({Message : "Rent Not Found"})
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
}


// Update Rent By Admin
export const updateRent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Rent = await costalRent.findById(id);
    if (Rent) {
      const updatedRent = await costalRent.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ Message: "Rent Updated Successfully", updatedRent });
    } else {
      return res.status(400).json({ Message: "Rent Not Found" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

// Delete Rent By Admin
export const deleteRent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Rent = await costalRent.findById(id);
    if (Rent) {
      await costalRent.findByIdAndDelete(id);
      res.status(200).json({ Message: "Rent Deleted Successfully" });
    } else {
      return res.status(400).json({ Message: "Rent Not Found" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error} , 500`));
  }
};

//get All Rents of User (Freelancer , Agency , SubAccount)
//If id == agencyId  the Rents will contain the Rent of his SubAccount
export const getRentsOfUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const Rents = await costalRent
      .find({
        $or: [{ userId: userId }, { AgencyId: userId }],
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ Rents: Rents });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};
