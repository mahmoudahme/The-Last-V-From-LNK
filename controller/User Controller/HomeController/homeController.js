//import Sale Listing
import residentialList from "../../../model/Sales/residentialList.js";
import commercialList from "../../../model/Sales/commercialList.js";
import costalList from "../../../model/Sales/costalList.js";

//import Rent Listing
import residentialRent from "../../../model/Rent/residentialRent.js";
import commercialRent from "../../../model/Rent/commercialRent.js";
import costalRent from "../../../model/Rent/costalRent.js";

//import Sale Request 
import commercialRequest from "../../../model/Sale Request/commercialRequest.js"
import costalRequest from "../../../model/Sale Request/costalRequest.js"
import residentailRequest from "../../../model/Sale Request/residentailRequest.js"

//import Rent Request
import commercialRequestRent from "../../../model/Rent Request/commercialRequestRent.js"
import costalRequestRent from "../../../model/Rent Request/costalRequestRent.js"
import residentialRequestRent from "../../../model/Rent Request/residentialRequestRent.js"

import { ApiError } from "../../../Utils/apiError.js";
import { shuffleArray } from "../../../middleware/shuffleArray.js";

export const getListing = async(req , res , next)=>{
  try{
    const {see , type } = req.query
    if(type == "Sale"){
      if(see == undefined || see == "All"){
        const residential = await residentialList.find().limit(5).sort({ createdAt: -1 });
        const commercial = await commercialList.find().limit(5).sort({ createdAt: -1 });
        const costal = await costalList.find().limit(5).sort({ createdAt: -1 });
        const residentialAndCommercial = residential.concat(commercial).sort({ createdAt: -1 });
        const allListing = residentialAndCommercial.concat(costal).sort({ createdAt: -1 });
        shuffleArray(allListing) ;
        const residentialRequests = await residentailRequest.find().limit(5).sort({ createdAt: -1 });
        const commercialRequests = await commercialRequest.find().limit(5).sort({ createdAt: -1 });
        const costalRequests = await costalRequest.find().limit(5).sort({ createdAt: -1 });
        const residentialRequestAndCommercialRequest = residentialRequests.concat(commercialRequests) ;
        const allRequests = residentialRequestAndCommercialRequest.concat(costalRequests) ;
        shuffleArray(allRequests) ;
        res.status(200).json({Data : allListing , Request : allRequests})
      }else if(see == "residential"){
        const residential = await residentialList.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(residential) ;
        const residentailRequests = await residentailRequest.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(residentailRequests) ;
        res.status(200).json({Data : residential , Request : residentailRequests})
      }else if(see == "costal"){
        const costal = await costalList.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(costal) ;
        const costalRequests = await costalRequest.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(costalRequests) ;
        res.status(200).json({Data : costal , Request : costalRequests})
      }else if(see == "commercial"){
        const commerical = await commercialList.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(commerical) ;
        const commercialRequests = await commercialRequest.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(commercialRequests) ;
        res.status(200).json({Data : commerical  , Request : commercialRequest})
      }
    }else if(type == "Rent"){
      if(see == undefined || see == "All"){
        const residential = await residentialRent.find().limit(5).sort({ createdAt: -1 });
        const commercial = await commercialRent.find().limit(5).sort({ createdAt: -1 });
        const costal = await costalRent.find().limit(5).sort({ createdAt: -1 });
        const residentialAndCommercial = residential.concat(commercial) ;
        const allListing = residentialAndCommercial.concat(costal) ;
        shuffleArray(allListing) ;
        const residentialRequests = await residentialRequestRent.find().limit(5).sort({ createdAt: -1 });
        const commercialRequests = await commercialRequestRent.find().limit(5).sort({ createdAt: -1 });
        const costalRequests = await costalRequestRent.find().limit(5).sort({ createdAt: -1 });
        const residentialRequestAndCommercialRequest = residentialRequests.concat(commercialRequests) ;
        const allRequests = residentialRequestAndCommercialRequest.concat(costalRequests) ;
        shuffleArray(allRequests) ;
        res.status(200).json({Data : allListing , Request : allRequests})
      }else if(see == "residential"){
        const residential = await residentialRent.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(residential) ;
        const residentailRequests = await residentialRequestRent.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(residentailRequests) ;
        res.status(200).json({Data : residential , Request : residentailRequests})
      }else if(see == "costal"){
        const costal = await costalRent.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(costal) ;
        const costalRequests = await costalRequestRent.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(costalRequests) ;
        res.status(200).json({Data : costal , Request : costalRequests})
      }else if(see == "commercial"){
        const commerical = await commercialRent.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(commerical) ;
        const commercialRequests = await commercialRequestRent.find().limit(5).sort({ createdAt: -1 });
        shuffleArray(commercialRequests) ;
        res.status(200).json({Data : commerical  , Request : commercialRequest})
      }
    }
  }catch(error){
    return next(new ApiError(`server Error ${error}` , 500))
  }
};

