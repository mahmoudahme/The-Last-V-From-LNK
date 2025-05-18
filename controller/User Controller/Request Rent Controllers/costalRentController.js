import { configDotenv } from "dotenv";
import costalRequestRent from "../../../model/Rent Request/costalRequestRent.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createCostalRentRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdRequest = new costalRequestRent({
          typeOfRequest: req.body.typeOfRequest,
          apartment: req.body.apartment,
          city: req.body.city,
          location: req.body.location,
          floor: req.body.floor,
          area: req.body.area,
          rooms: req.body.rooms,
          bathRooms: req.body.bathRooms,
          reseptionPieces: req.body.reseptionPieces,
          balcona: req.body.balcona,
          furnising: req.body.furnising,
          finishing: req.body.finishing,
          typeOfRent: req.body.typeOfRent,
          minPrice: req.body.minPrice,
          maxPrice :  req.body.maxPrice ,

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

export const getAllCostalRentRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const costalRequestRents = await costalRequestRent
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < costalRequestRents.length; i++) {
          await costalRequestRent.findByIdAndUpdate(
            costalRequestRents[i]._id,
            {
              view: costalRequestRents[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: costalRequestRents });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyCostalRentRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const costalRequestRents = await costalRequestRent
            .find({ userId: user.id })
            .skip(skip)
            .limit(limit)
            // .populate({ path: "userId", select: "name-_id" })
            // .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            costalRequestRents: costalRequestRents,
          });
        } else if (user.typeofUser == "agency") {
          const costalRequestRents = await costalRequestRent
            .find({ AgencyId: user.id })
            .skip(skip)
            .limit(limit)
            // .populate({ path: "userId", select: "name-_id" })
            // .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            costalRequestRents: costalRequestRents,
          });
        } else {
          const costalRequestRents = await costalRequestRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            costalRequestRents: costalRequestRents,
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

export const deleteCostalRentRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const costal = await costalRequestRent.findById(listId);
        if (costal) {
          if (
            req.user.id == costal.userId ||
            req.user.id == costal.AgencyId ||
            req.user.isAdmin
          ) {
            await costalRequestRent.findByIdAndDelete(listId);
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

export const updateCostalRentRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.id;
        const costal = await costalRequestRent.findById(RequestId);
        if (costal) {
          if (
            req.user.id == costal.userId ||
            req.user.id == costal.AgencyId ||
            req.user.isAdmin
          ) {
            const newRequest = await costalRequestRent
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

export const getOneCostalRentRequest= async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.listid;
        const costal = await costalRequestRent.findById(RequestId);
        if (costal) {
          const oneRequest = await costalRequestRent
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
