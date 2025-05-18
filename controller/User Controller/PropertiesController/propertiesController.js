import commercialList from "../../../model/Sales/commercialList.js";
import costalList from "../../../model/Sales/costalList.js";
import residentialList from "../../../model/Sales/residentialList.js";
import commercialRent from "../../../model/Rent/commercialRent.js";
import costalRent from "../../../model/Rent/costalRent.js";
import residentialRent from "../../../model/Rent/residentialRent.js";
import { ApiError } from "../../../Utils/apiError.js"

//pageination
// if(type == sale)=>{retrun data if(see == All) , if(see ==res) ... }
// else if(type == rent)=>{retrun data if(see == All) , if(see ==res) ... }
export const getFeeds = async(req , res , next)=>{
  try {
    const {type , see } = req.query ;
    const page = req.query.page || 1; //2
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const limitForAll = req.query.limit || 3;
    const skipForAll = (page - 1) * limitForAll;

    if(type == "Sale"){
      if(see == "All" || see == undefined){
        const commercialLists = await commercialList.find().skip(skipForAll).limit(limitForAll);
        const costalLists = await costalList.find().skip(skipForAll).limit(limitForAll);
        const residentialLists = await residentialList.find().skip(skipForAll).limit(limitForAll);
        const commercialListsAndcostalLists = commercialLists.concat(costalLists);
        const AllListing = commercialListsAndcostalLists.concat(residentialLists) 
        res.status(200).json({Listing  : AllListing})
      }else if(see == "residential"){
        const residentialLists = await residentialList.find().skip(skip).limit(limit);
        res.status(200).json({Listing  : residentialLists})
      }else if(see == "costal"){
        const costalLists = await costalList.find().skip(skip).limit(limit);
        res.status(200).json({Listing  : costalLists})
      }else if(see == "commercial"){
        const commercialLists = await commercialList.find().skip(skip).limit(limit);
        res.status(200).json({Listing  : commercialLists})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }else if(type == "Rent"){
      if(see == "All" || see == undefined){
        const commercialRents = await commercialRent.find().skip(skipForAll).limit(limitForAll);
        const costalRents = await costalRent.find().skip(skipForAll).limit(limitForAll);
        const residentialRents = await residentialRent.find().skip(skipForAll).limit(limitForAll);
        const commercialRentsAndcostalRents = commercialRents.concat(costalRents);
        const AllListingRent = commercialRentsAndcostalRents.concat(residentialRents) 
        res.status(200).json({Listing  : AllListingRent})
      }else if(see == "residential"){
        const residentialRents = await residentialRent.find().skip(skip).limit(limit);
        res.status(200).json({Listing  : residentialRents})
      }else if(see == "costal"){
        const costalRents = await costalRent.find().skip(skip).limit(limit);
        res.status(200).json({Listing  : costalRents})
      }else if(see == "commercial"){
        const commercialRents = await commercialRent.find().skip(skip).limit(limit);
        res.status(200).json({Listing  : commercialRents})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }
  } catch (error) {
    return next(new ApiError(`Server error ${error}` , 500))
  }
} ;

export const getMyFeeds = async(req , res , next)=>{
  try{
    const {type , see } = req.query ;
    const page = req.query.page || 1; //2
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const limitForAll = req.query.limit || 3;
    const skipForAll = (page - 1) * limitForAll;

    if(type == "Sale"){
      if(see == "All" || see == undefined){
        const commercialLists = await commercialList.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const costalLists = await costalList.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const residentialLists = await residentialList.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const commercialListsAndcostalLists = commercialLists.concat(costalLists);
        const AllListing = commercialListsAndcostalLists.concat(residentialLists) 
        res.status(200).json({Listing  : AllListing})
      }else if(see == "residential"){
        const residentialLists = await residentialList.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Listing  : residentialLists})
      }else if(see == "costal"){
        const costalLists = await costalList.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Listing  : costalLists})
      }else if(see == "commercial"){
        const commercialLists = await commercialList.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Listing  : commercialLists})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }else if(type == "Rent"){
      if(see == "All" || see == undefined){
        const commercialRents = await commercialRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const costalRents = await costalRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const residentialRents = await residentialRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skipForAll).limit(limitForAll);
        const commercialRentsAndcostalRents = commercialRents.concat(costalRents);
        const AllListingRent = commercialRentsAndcostalRents.concat(residentialRents) 
        res.status(200).json({Listing  : AllListingRent})
      }else if(see == "residential"){
        const residentialRents = await residentialRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Listing  : residentialRents})
      }else if(see == "costal"){
        const costalRents = await costalRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Listing  : costalRents})
      }else if(see == "commercial"){
        const commercialRents = await commercialRent.find({ 
          $or: [
          { userId: req.user.id },
          { AgencyId: req.user.id  }
      ],
    }).skip(skip).limit(limit);
        res.status(200).json({Listing  : commercialRents})
      }else{
        return res.status(404).json({Message : "The Is no Data"})
      }
    }
  }catch(error){
    return next(new ApiError(`Server Error ${error}` , 500))
  }
}