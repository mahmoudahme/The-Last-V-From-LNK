import costalList from "../../../model/Sales/costalList.js";
import { ApiError } from "../../../Utils/apiError.js";

// Get All From Costal Listing
export const getAllListing = async (req, res, next) => {
  try {
    const costalLists = await costalList.find();
    res.status(200).json({ costalListing: costalLists });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

// Get One Lost From Costal Listing
export const getOneList = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const list = await costalList.findById(id);
    if(list){
      return res.status(200).json({list : list})
    }else{
      return res.status(404).json({Message : "List Not Found"})
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
}
// Update List By Admin
export const updateList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const list = await costalList.findById(id);
    if (list) {
      const updatedList = await costalList.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ Message: "List Updated Successfully", updatedList });
    } else {
      return res.status(400).json({ Message: "List Not Found" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

// Delete List By Admin
export const deleteList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const list = await costalList.findById(id);
    if (list) {
      await costalList.findByIdAndDelete(id);
      res.status(200).json({ Message: "List Deleted Successfully" });
    } else {
      return res.status(400).json({ Message: "List Not Found" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error} , 500`));
  }
};

//get All Listing of User (Freelancer , Agency , SubAccount)
//If id == agencyId  the listing will contain the list of his SubAccount
export const getListingOfUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const listing = await costalList
      .find({
        $or: [{ userId: userId }, { AgencyId: userId }],
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ Listing: listing });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};
