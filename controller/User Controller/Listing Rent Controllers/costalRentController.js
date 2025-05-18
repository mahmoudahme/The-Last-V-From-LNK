import { configDotenv } from "dotenv";
import costalRent from "../../../model/Rent/costalRent.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createCostalRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdListing = new costalRent({
          typeOfList: req.body.typeOfList,
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

export const getAllCostalRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const costalRents = await costalRent
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < costalRents.length; i++) {
          await costalRent.findByIdAndUpdate(
            costalRents[i]._id,
            {
              view: costalRents[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: costalRents });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyCostalRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const costalRents = await costalRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            costalRents: costalRents,
          });
        } else if (user.typeofUser == "agency") {
          const costalRents = await costalRent
            .find({ $or :[{AgencyId : user.id} , {userId : user.id}]})
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            costalRents: costalRents,
          });
        } else {
          const costalRents = await costalRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            costalRents: costalRents,
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

export const deleteCostalRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const costal = await costalRent.findById(listId);
        if (costal) {
          if (
            req.user.id == costal.userId ||
            req.user.id == costal.AgencyId ||
            req.user.isAdmin
          ) {
            await costalRent.findByIdAndDelete(listId);
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

export const updateCostalRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const costal = await costalRent.findById(listId);
        if (costal) {
          if (
            req.user.id == costal.userId ||
            req.user.id == costal.AgencyId ||
            req.user.isAdmin
          ) {
            const newListing = await costalRent
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

export const getOneCostalRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listID = req.params.listid;
        const costal = await costalRent.findById(listID);
        if (costal) {
          const oneList = await costalRent
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
