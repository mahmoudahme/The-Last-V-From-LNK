import { configDotenv } from "dotenv";
import commercialList from "../../../model/Sales/commercialList.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createCommercialListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdListing = new commercialList({
          typeOfList: req.body.typeOfList,
          city: req.body.city,
          location: req.body.location,
          floor: req.body.floor,
          area: req.body.area,
          finishing: req.body.finishing,
          furnising : req.body.furnising ,
          price: req.body.price,
          typeOfPay: req.body.typeOfPay,
          Downpayment: req.body.Downpayment,
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

export const getAllCommercialListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const commercialLists = await commercialList
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < commercialLists.length; i++) {
          await commercialList.findByIdAndUpdate(
            commercialLists[i]._id,
            {
              view: commercialLists[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: commercialLists });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyCommercialListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const commercialLists = await commercialList
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialLists: commercialLists,
          });
        } else if (user.typeofUser == "agency") {
          const commercialLists = await commercialList
            .find({ AgencyId: user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            commercialLists: commercialLists,
          });
        } else {
          const commercialLists = await commercialList
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            commercialLists: commercialLists,
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

export const deleteCommercialListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const commercial = await commercialList.findById(listId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            await commercialList.findByIdAndDelete(listId);
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

export const updateCommercialListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const commercial = await commercialList.findById(listId);
        if (commercial) {
          if (
            req.user.id == commercial.userId ||
            req.user.id == commercial.AgencyId ||
            req.user.isAdmin
          ) {
            const newListing = await commercialList
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
 
export const getOneCommercialListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listID = req.params.listid;
        const commercial = await commercialList.findById(listID);
        if (commercial) {
          const oneList = await commercialList
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
