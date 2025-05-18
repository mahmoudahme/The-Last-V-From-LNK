import { configDotenv } from "dotenv";
import commercialRequest from "../../../model/Sale Request/commercialRequest.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createCommercialRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdRequest = new commercialRequest({
          typeOfRequest: req.body.typeOfRequest,
          city: req.body.city,
          location: req.body.location,

          area: req.body.area,
          floor:req.body.floor ,
          finishing: req.body.finishing,
          minPrice: req.body.minPrice,
          maxPrice: req.body.maxPrice,
          typeOfPay: req.body.typeOfPay,
          downPayment: req.body.downPayment,
          years: req.body.years,

          additional: req.body.additional,
          title: req.body.title,
          description: req.body.description,          
          whatsApp: req.body.whatsApp,
          phoneNumber: req.body.phoneNumber,
          typeOfPublish: req.body.typeOfPublish,
          userId: req.user.id,
          AgencyId: user.UserId,
        })
        await createdRequest.save();
        res.status(201).json({
          message: "your Request is Created",
          data: createdRequest,
        });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllCommercialRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const commercialRequests = await commercialRequest
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < commercialRequests.length; i++) {
          await commercialRequest.findByIdAndUpdate(
            commercialRequests[i]._id,
            {
              view: commercialRequests[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: commercialRequests });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyCommercialRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const commercialRequests = await commercialRequest
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialRequests: commercialRequests,
          });
        } else if (user.typeofUser == "agency") {
          const commercialRequests = await commercialRequest
            .find({ AgencyId: user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialRequests: commercialRequests,
          });
        } else {
          const commercialRequests = await commercialRequest
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            commercialRequests: commercialRequests,
          });
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const deleteCommercialRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.id;
        const commercial = await commercialRequest.findById(RequestId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            await commercialRequest.findByIdAndDelete(RequestId);
            res.status(200).json({ Message: " Your list is Deleted ! " });
          } else {
            return next(new ApiError(`You Can't Delete This List `, 403));
          }
        } else {
          return next(new ApiError(`This List doesn't Exist `, 404));
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const updateCommercialRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.id;
        const commercial = await commercialRequest.findById(RequestId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            const newRequest = await commercialRequest
              .findByIdAndUpdate(RequestId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Request: newRequest });
          } else {
            return next(new ApiError(`You Can't Update This List `, 403));
          }
        } else {
          return next(new ApiError(`This List doesn't Exist `, 404));
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getOneCommercialRequest= async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.listid;
        const commercial = await commercialRequest.findById(RequestId);
        if (commercial) {
          const oneRequest = await commercialRequest
            .find({ _id: RequestId })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          res.status(200).json({ Request: oneRequest });
        } else {
          return next(new ApiError(`This List doesn't Exist `, 404));
        }
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};
