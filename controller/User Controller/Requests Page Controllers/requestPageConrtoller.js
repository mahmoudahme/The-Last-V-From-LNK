import commercialRequest from "../../../model/Sale Request/commercialRequest.js";
import costalRequest from "../../../model/Sale Request/costalRequest.js";
import residentailRequest from "../../../model/Sale Request/residentailRequest.js";
import commercialRequestRent from "../../../model/Rent Request/commercialRequestRent.js";
import costalRequestRent from "../../../model/Rent Request/costalRequestRent.js";
import residentialRequestRent from "../../../model/Rent Request/residentialRequestRent.js";
import { ApiError } from "../../../Utils/apiError.js"

//pageination
// if(type == sale)=>{retrun data if(see == All) , if(see ==res) ... }
// else if(type == rent)=>{retrun data if(see == All) , if(see ==res) ... }
export const getRequests = async(req , res , next)=>{
  try {
    const {type , see } = req.query ;
    const page = req.query.page || 1; //2
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const limitForAll = req.query.limit || 3;
    const skipForAll = (page - 1) * limitForAll;

    if(type == "Sale"){
      if(see == "All" || see == undefined){
        const commercialRequests = await commercialRequest.find().skip(skipForAll).limit(limitForAll);
        const costalRequests = await costalRequest.find().skip(skipForAll).limit(limitForAll);
        const residentailRequests = await residentailRequest.find().skip(skipForAll).limit(limitForAll);
        const commercialRequestsAndresidentailRequests = commercialRequests.concat(costalRequests);
        const AllRequests = commercialRequestsAndresidentailRequests.concat(residentailRequests) 
        res.status(200).json({Listing  : AllRequests})
      }else if(see == "residential"){
        const residentailRequests = await residentailRequest.find().skip(skip).limit(limit);
        res.status(200).json({Request  : residentailRequests})
      }else if(see == "costal"){
        const costalRequests = await costalRequest.find().skip(skip).limit(limit);
        res.status(200).json({Request  : costalRequests})
      }else if(see == "commercial"){
        const commercialRequests = await commercialRequest.find().skip(skip).limit(limit);
        res.status(200).json({Request  : commercialRequests})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }else if(type == "Rent"){
      if(see == "All" || see == undefined){
        const commercialRequestRents = await commercialRequestRent.find().skip(skipForAll).limit(limitForAll);
        const costalRequestRents = await costalRequestRent.find().skip(skipForAll).limit(limitForAll);
        const residentialRequestRents = await residentialRequestRent.find().skip(skipForAll).limit(limitForAll);
        const commercialRentsAndcostalRents = commercialRequestRents.concat(costalRequestRents);
        const AllRequestRent = commercialRentsAndcostalRents.concat(residentialRequestRents) 
        res.status(200).json({Request  : AllRequestRent})
      }else if(see == "residential"){
        const residentialRequestRents = await residentialRequestRent.find().skip(skip).limit(limit);
        res.status(200).json({Request  : residentialRequestRents})
      }else if(see == "costal"){
        const costalRequestRents = await costalRequestRent.find().skip(skip).limit(limit);
        res.status(200).json({Request  : costalRequestRents})
      }else if(see == "commercial"){
        const commercialRequestRents = await commercialRequestRent.find().skip(skip).limit(limit);
        res.status(200).json({Request  : commercialRequestRents})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }
  } catch (error) {
    return next(new ApiError(`Server error ${error}` , 500))
  }
} ;

export const getMyRequests = async(req , res , next)=>{
  try{
    const {type , see } = req.query ;
    const page = req.query.page || 1; //2
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const limitForAll = req.query.limit || 3;
    const skipForAll = (page - 1) * limitForAll;

    if(type == "Sale"){
      if(see == "All" || see == undefined){
        const commercialLists = await commercialRequest.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const costalLists = await costalRequest.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const residentialLists = await residentailRequest.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const commercialListsAndcostalLists = commercialLists.concat(costalLists);
        const AllListing = commercialListsAndcostalLists.concat(residentialLists) 
        res.status(200).json({Request  : AllListing})
      }else if(see == "residential"){
        const residentialLists = await residentailRequest.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Request  : residentialLists})
      }else if(see == "costal"){
        const costalLists = await costalRequest.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Request  : costalLists})
      }else if(see == "commercial"){
        const commercialLists = await commercialRequest.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Request  : commercialLists})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }else if(type == "Rent"){
      if(see == "All" || see == undefined){
        const commercialRents = await commercialRequestRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const costalRents = await costalRequestRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const residentialRents = await residentialRequestRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const commercialRentsAndcostalRents = commercialRents.concat(costalRents);
        const AllListingRent = commercialRentsAndcostalRents.concat(residentialRents) 
        res.status(200).json({Request  : AllListingRent})
      }else if(see == "residential"){
        const residentialRents = await residentialRequestRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Request  : residentialRents})
      }else if(see == "costal"){
        const costalRents = await costalRequestRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Request  : costalRents})
      }else if(see == "commercial"){
        const commercialRents = await commercialRequestRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Request  : commercialRents})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }
  }catch(error){
    return next(new ApiError(`Server Error ${error}` , 500))
  }
}