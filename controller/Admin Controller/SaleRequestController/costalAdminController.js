import { costalRequest } from "../../../model/Sale Request/costalRequest.js";
import { ApiError } from "../../../Utils/apiError.js";

export const getAllRequests = async (req, res, next) => {
  try {
    const saleRequests = await costalRequest.find();
    res.status(200).json(saleRequests);
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getOneRequest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const saleRequest = await costalRequest.findById(id);
    if (!saleRequest) {
      return next(new ApiError(`Sale Request Not Found`, 404));
    }
    res.status(200).json(saleRequest);
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getRequestsOfUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const saleRequests = await costalRequest
      .find({
        $or: [{ userId: userId }, { AgencyId: userId }],
      })
      .sort({ createdAt: -1 });
    res.status(200).json(saleRequests);
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const updateRequest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedRequest = req.body;
    const saleRequest = await costalRequest.findByIdAndUpdate(
      id,
      updatedRequest,
      {
        new: true,
      }
    );
    if (!saleRequest) {
      return next(new ApiError(`Sale Request Not Found`, 404));
    }
    res.status(200).json(saleRequest);
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};


export const deleteRequest = async(req , res , next)=>{
  try {
    const id = req.params.id;
    const saleRequest = await costalRequest.findByIdAndDelete(id);
    if (!saleRequest) {
      return next(new ApiError(`Sale Request Not Found`, 404));
      }
      res.status(200).json({ message: "Sale Request Deleted Successfully" });
      
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
}