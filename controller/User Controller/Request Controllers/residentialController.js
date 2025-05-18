import { configDotenv } from "dotenv";
import stringSimilarity from "string-similarity";
import residentialList from "../../../model/Sales/residentialList.js";
import residentailRequest from "../../../model/Sale Request/residentailRequest.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });

export const createResdientailRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdRequest = new residentailRequest({
          typeOfRequest: req.body.typeOfRequest,
          apartment: req.body.apartment,
          city: req.body.city,
          location: req.body.location,

          floor: req.body.floor,
          area: req.body.area,
          rooms: req.body.rooms,
          bathRooms: req.body.bathRooms,
          balcona: req.body.balcona,
          reseptionPieces: req.body.reseptionPieces,
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

export const getAllResidentailRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const residentailRequests = await residentailRequest
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" });
        for (var i = 0; i < residentailRequests.length; i++) {
          await residentailRequest.findByIdAndUpdate(
            residentailRequests[i]._id,
            {
              view: residentailRequests[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: residentailRequests });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyResidentailRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const residentailRequests = await residentailRequest
            .find({ userId: user.id })
            .skip(skip)
            .limit(limit);
          // .populate({ path: "userId", select: "name-_id" })
          // .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            residentailRequests: residentailRequests,
          });
        } else if (user.typeofUser == "agency") {
          const residentailRequests = await residentailRequest
            .find({ AgencyId: user.id })
            .skip(skip)
            .limit(limit);
          // .populate({ path: "userId", select: "name-_id" })
          // .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            residentailRequests: residentailRequests,
          });
        } else {
          const residentailRequests = await residentailRequest
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            residentailRequests: residentailRequests,
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

export const deleteResidentailRequests = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentailRequest.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId ||
            req.user.isAdmin
          ) {
            await residentailRequest.findByIdAndDelete(listId);
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

export const updateResidentailRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.id;
        const residentail = await residentailRequest.findById(RequestId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId ||
            req.user.isAdmin
          ) {
            const newRequest = await residentailRequest
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

export const getOneResidentailRequest = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const RequestId = req.params.listid;
        const residentail = await residentailRequest.findById(RequestId);
        if (residentail) {
          const data = {
            city: residentail.city,
            location: residentail.location,
            apartment: residentail.apartment,
          };
          const ListingSale = await residentialList.find(data);
          const allListing = await residentialList.find();
          const filteredListing =  allListing.filter(item => {
                const similarity = stringSimilarity.compareTwoStrings(item.description, residentail.title);
                console.log(similarity)
                return similarity * 100 > 30;
              });
          res.status(200).json({ Request: residentail , SimilarListing  : ListingSale , filteredListing : filteredListing});
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
