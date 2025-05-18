import { configDotenv } from "dotenv";
import residentialRent from "../../../model/Rent/residentialRent.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createResdientailRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdListing = new residentialRent({
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
          message: "your list As Rent is Created",
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

export const getAllResidentailRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const residentialRents = await residentialRent
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < residentialRents.length; i++) {
          await residentialRent.findByIdAndUpdate(
            residentialRents[i]._id,
            {
              view: residentialRents[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Rents : residentialRents });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyResidentailRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const residentialRents = await residentialRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            residentialRents: residentialRents,
          });
        } else if (user.typeofUser == "agency") {
          const residentialRents = await residentialRent
            .find({$or: [{ AgencyId: user.id }, { userId: user.id }]})
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            residentialRents: residentialRents,
          });
        } else {
          const residentialRents = await residentialRent
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            residentialRents: residentialRents,
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

export const deleteResidentailRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialRent.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId ||
            req.user.isAdmin
          ) {
            await residentialRent.findByIdAndDelete(listId);
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

export const updateResidentailRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialRent.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId ||
            req.user.isAdmin
          ) {
            const newListing = await residentialRent
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

export const getOneResidentailRentListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listID = req.params.listid;
        const residentail = await residentialRent.findById(listID);
        if (residentail) {
          const oneList = await residentialRent
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
