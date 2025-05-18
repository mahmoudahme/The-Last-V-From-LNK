import { configDotenv } from "dotenv";
import residentialList from "../../../model/Sales/residentialList.js";
import User from "../../../model/User/User.js";
import { ApiError } from "../../../Utils/apiError.js";
import { verifyToken } from "../../../Utils/verifyToken.js";
configDotenv({ path: "config/config.env" });
// import xlsx from "xlsx"

// export const addingResdientailListing = async()=>{
//   const workbook = xlsx.readFile("Sale List Residential.xlsx");
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName]; 

//   const data = xlsx.utils.sheet_to_json(sheet, { header: 3 }); 
//   for(var i = 0 ; i< data.length ; i++){
//     const createNewList = new residentialList(data[i]);
//     await createNewList.save();
//   }
// }



export const createResdientailListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const user = await User.findById(req.user.id);
        const createdListing = new residentialList({
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

export const getAllResidentailListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const residentialLists = await residentialList
          .find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "userId", select: "name-_id" })
          .populate({ path: "AgencyId", select: "name-_id" })
          .populate({ path: "location", select: "-_id nameAr nameEn" })
          .populate({ path: "finishing", select: "-_id finishingEn finishingAr" })
          .populate({ path: "furnising", select: "-_id furnisingEN furnisingAr" })
          .populate({ path: "city", select: "_id cityNameEn cityNameAr" })
          .populate({ path: "apartment", select: "-_id apartmentNameEn apartmentNameAr" });
        for (var i = 0; i < residentialLists.length; i++) {
          await residentialList.findByIdAndUpdate(
            residentialLists[i]._id,
            {
              view: residentialLists[i].view + 1,
            },
            { new: true }
          );
        }
        res.status(201).json({ Listing: residentialLists });
      } else {
        return next(new ApiError(`You are not authenticated! `, 401));
      }
    } catch (error) {
      return next(new ApiError(`System Error ${error}`, 400));
    }
  });
};

export const getAllMyResidentailListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user.typeofUser == "freelancer") {
          const residentialLists = await residentialList
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            residentialLists: residentialLists,
          });
        } else if (user.typeofUser == "agency") {
          const residentialLists = await residentialList
            .find({ AgencyId: user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });
          return res.status(200).json({
            residentialLists: residentialLists,
          });
        } else {
          const residentialLists = await residentialList
            .find({ userId: req.user.id })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

          return res.status(200).json({
            residentialLists: residentialLists,
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

export const deleteResidentailListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialList.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId ||
            req.user.isAdmin
          ) {
            await residentialList.findByIdAndDelete(listId);
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

export const updateResidentailListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listId = req.params.id;
        const residentail = await residentialList.findById(listId);
        if (residentail) {
          if (
            req.user.id == residentail.userId ||
            req.user.id == residentail.AgencyId ||
            req.user.isAdmin
          ) {
            const newListing = await residentialList
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

export const getOneResidentailListing = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const listID = req.params.listid;
        const residentail = await residentialList.findById(listID);
        if (residentail) {
          const oneList = await residentialList
            .find({ _id: listID })
            .populate({ path: "userId", select: "name-_id" })
            .populate({ path: "AgencyId", select: "name-_id" });

            const data ={
              location : oneList.location,
              price : oneList.price,
              title : oneList.title,
              description : oneList.description,
              rooms : oneList.rooms,
              area : oneList.area
            }
          res.status(200).json({ List: oneList });
        }else{
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
