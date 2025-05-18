import Apartment from "../../../model/Apartment/Apartment.js";
import { ApiError } from "../../../Utils/apiError.js";

export const getAllApartment = async(req , res , next )=>{
  try{
    const lang = req.query.lang ;
    if(lang == "ar"){
      const apartments = await Apartment.find().select("apartmentNameAr");
      const modifiedApartment = apartments.map(apartment => ({
        id : apartment._id ,
        name: apartment.apartmentNameAr
      }));
      res.status(200).json({apartments : modifiedApartment});
    }else{
      const apartments = await Apartment.find().select("apartmentNameEn");
      const modifiedApartment = apartments.map(apartment => ({
        id : apartment._id ,
        name: apartment.apartmentNameEn
      }));
      res.status(200).json({apartments : modifiedApartment});
    }
    
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

