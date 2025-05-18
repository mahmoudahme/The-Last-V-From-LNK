import { configDotenv } from "dotenv";
import costalRequest from "../../../model/Sale Request/costalRequest.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createCostalRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdRequest = new costalRequest({
          typeOfRequest: req.body.typeOfRequest,
          apartment: req.body.apartment,
          city: req.body.city,
          location: req.body.location,

          floor: req.body.floor,
          area: req.body.area,
          rooms: req.body.rooms,
          bathRooms: req.body.bathRooms,
          balcona : req.body.balcona ,
          reseptionPieces : req.body.reseptionPieces ,
          furnising: req.body.furnising,
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
        });
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

export const getAllCostalRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const costalRequests = await costalRequest
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < costalRequests.length; i++) {
          await costalRequest.findByIdAndUpdate(
            costalRequests[i]._id,
            {
              view: costalRequests[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: costalRequests });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyCostalRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const costalRequests = await costalRequest
            .find({ userId: user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            costalRequests: costalRequests,
          });
        } else if (user.typeofUser == "agency") {
          const costalRequests = await costalRequest
            .find({ AgencyId: user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            costalRequests: costalRequests,
          });
        } else {
          const costalRequests = await costalRequest
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            costalRequests: costalRequests,
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

export const deleteCostalRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.id;
        const costal = await costalRequest.findById(RequestId);
        if (costal) {
          if (
            req.user.id == costal.userId ||
            req.user.id == costal.AgencyId ||
            req.user.isAdmin
          ) {
            await costalRequest.findByIdAndDelete(RequestId);
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

export const updateCostalRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.id;
        const costal = await costalRequest.findById(RequestId);
        if (costal) {
          if (
            req.user.id == costal.userId ||
            req.user.id == costal.AgencyId ||
            req.user.isAdmin
          ) {
            const newRequest = await costalRequest
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

export const getOneCostalRequest= async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.listid;
        const costal = await costalRequest.findById(RequestId);
        if (costal) {
          const oneRequest = await costalRequest
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
