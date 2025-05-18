import { configDotenv } from "dotenv";
import commercialRequestRent from "../../../model/Rent Request/commercialRequestRent.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createCommercailRentRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdRequest = new commercialRequestRent({
          typeOfRequest: req.body.typeOfRequest,
          city: req.body.city,
          location: req.body.location,

          floor : req.body.floor,
          area: req.body.area,
          finishing: req.body.finishing,
          typeOfRent : req.body.typeOfRent ,
          minPrice: req.body.minPrice,
          maxPrice: req.body.maxPrice,

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

export const getAllCommercailRentRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const commercialRequestRents = await commercialRequestRent
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < commercialRequestRents.length; i++) {
          await commercialRequestRent.findByIdAndUpdate(
            commercialRequestRents[i]._id,
            {
              view: commercialRequestRents[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: commercialRequestRents });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyCommercailRentRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const commercialRequestRents = await commercialRequestRent
            .find({ userId: user.id })
            .skip(skip)
            .limit(limit);
          // .populate({ path: "userId", select: "name-_id" })
          // .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialRequestRents: commercialRequestRents,
          });
        } else if (user.typeofUser == "agency") {
          const commercialRequestRents = await commercialRequestRent
            .find({ AgencyId: user.id })
            .skip(skip)
            .limit(limit);
          // .populate({ path: "userId", select: "name-_id" })
          // .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialRequestRents: commercialRequestRents,
          });
        } else {
          const commercialRequestRents = await commercialRequestRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            commercialRequestRents: commercialRequestRents,
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

export const deleteCommercailRentRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const commercial = await commercialRequestRent.findById(listId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            await commercialRequestRent.findByIdAndDelete(listId);
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

export const updateCommercailRentRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.id;
        const commercial = await commercialRequestRent.findById(RequestId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            const newRequest = await commercialRequestRent
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

export const getOneCommercailRentRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.listid;
        const commercial = await commercialRequestRent.findById(RequestId);
        if (commercial) {
          const oneRequest = await commercialRequestRent
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
