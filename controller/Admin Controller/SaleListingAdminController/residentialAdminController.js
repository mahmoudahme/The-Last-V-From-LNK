import residentialList from "../../../model/Sales/residentialList.js";
import { ApiError } from "../../../Utils/apiError.js";

// Get All For residential Listing
export const getAllListing = async (req, res, next) => {
  try {
    const residentialLists = await residentialList.find()
    .populate({path:"apartment" , select :"-_id apartmentNameEn apartmentNameAr"})
    .populate({path:"city" , select :"-_id cityNameEn cityNameAr"})
    .populate({path:"location" , select :"-_id nameEn nameAr"})
    .populate({path:"finishing", select :"-_id finishingEn finishingAr"})
    .populate({path:"furnising", select :"-_id furnisingEN furnisingAR"})
    .populate({path:"userId" , select :"-_id name email phone"})
    .populate({path:"AgencyId" , select :"-_id name email phone"})
    ;
    res.status(200).json({ residentialLists: residentialLists })
    ;
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getOneList = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const list = await residentialList.findById(id);
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
    const list = await residentialList.findById(id);
    if (list) {
      const updatedList = await residentialList.findByIdAndUpdate(
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
    const list = await residentialList.findById(id);
    if (list) {
      await residentialList.findByIdAndDelete(id);
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
    const userId = req.params.id;
    const listing = await residentialList
      .find({
        $or: [{ userId: userId }, { AgencyId: userId }],
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ Listing: listing });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};
