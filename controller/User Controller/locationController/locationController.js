import Locations from "../../../model/Locations/Locations.js"
import { ApiError } from "../../../Utils/apiError.js"

export const gerAllLocatioons = async (req, res , next) => { 
  try { 
    const lang = req.query.lang; 
    if(lang == "ar"){
      const locations = await Locations.find().select("nameAr");
      const modifyLocations = locations.map(location=>{
        return {
          _id : location._id ,
          name: location.nameAr
        }
      });
      res.status(200).json({locations : modifyLocations})
    }else{
      const locations = await Locations.find().select("nameEn");
      const modifyLocations = locations.map(location=>{
        return {
          _id : location._id ,
          name: location.nameEn
        }
      });
      res.status(200).json({locations : modifyLocations})
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500))
  }
}

export const getAllLocationWithCountryId = async(req , res ,  next)=>{
  try {
    const id = req.params.id ;
    const lang = req.query.lang ;
    const locations = await Locations.find({city : id});
    if(lang === "ar"){
      const modifyLocations = locations.map(location=>{
        return{
          _id : location._id ,
          name : location.nameAr 
        }
      });
      res.status(200).json({Locations : modifyLocations}) ;

    }else{
      const modifyLocations = locations.map(location=>{
        return{
          _id : location._id ,
          name : location.nameEn 
        }
      });
      res.status(200).json({Locations : modifyLocations}) ;
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500))
  }
}