import { configDotenv } from "dotenv";
import commercialRent from "../../../model/Rent/commercialRent.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createCommercialRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdListing = new commercialRent({
          typeOfList: req.body.typeOfList,
          city: req.body.city,
          location: req.body.location,
          floor : req.body.floor ,
          area: req.body.area,
          finishing: req.body.finishing,
          furnising: req.body.furnising,
          typeOfRent : req.body.typeOfRent ,
          price: req.body.price,
          insurance: req.body.insurance,
          additional: req.body.additional,
          title: req.body.title,
          description: req.body.description,
          whatsApp: req.body.whatsApp,
          phoneNumber: req.body.phoneNumber,
          typeOfPublish: req.body.typeOfPublish,
          userId: req.user.id,
          AgencyId: user.UserId,
        });
        await createdListing.save();
        res.status(201).json({
          message: "your list is Created",
          data: createdListing,
        });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllCommercialRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const commercialRents = await commercialRent
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < commercialRents.length; i++) {
          await commercialRent.findByIdAndUpdate(
            commercialRents[i]._id,
            {
              view: commercialRents[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: commercialRents });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyCommercialRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const commercialRents = await commercialRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialRents: commercialRents,
          });
        } else if (user.typeofUser == "agency") {
          const commercialRents = await commercialRent
            .find({ $or : [{AgencyId : user.id} , {userId: user.id}]})
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialRents: commercialRents,
          });
        } else {
          const commercialRents = await commercialRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            commercialRents: commercialRents,
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

export const deleteCommercialRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const commercial = await commercialRent.findById(listId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            await commercialRent.findByIdAndDelete(listId);
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

export const updateCommercialRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const commercial = await commercialRent.findById(listId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            const newListing = await commercialRent
              .findByIdAndUpdate(listId, { $set: req.body }, { new: true })
              .populate({ path: "userId", select: "name-_id" })
              .populate({ path: "AgencyId", select: "name-_id" });
            res.status(200).json({ Listing: newListing });
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

export const getOneCommercialRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listID = req.params.listid;
        const commercial = await commercialRent.findById(listID);
        if (commercial) {
          const oneList = await commercialRent
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          res.status(200).json({ List: oneList });
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
