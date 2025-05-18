import TypeOfRent from "../../../model/Type Of Rent/TypeOfRent.js";
import { ApiError } from "../../../Utils/apiError.js";

export const getAllTypeOfRent= async(req , res , next )=>{
  try{
    const lang = req.query.lang ;
    if(lang == "ar"){
      const typeOfRents = await TypeOfRent.find().select("typeOfRentAR");
      const modifiedTypeOfRents = typeOfRents.map(typeOfRent => ({
        id : typeOfRent._id ,
        name: typeOfRent.typeOfRentAR
      }));
      res.status(200).json({typeOfRents : modifiedTypeOfRents});
    }else{
      const typeOfRents = await TypeOfRent.find().select("typeOfRentEN");
      const modifiedtypeOfRents = typeOfRents.map(typeOfRent => ({
        id : typeOfRent._id ,
        name: typeOfRent.typeOfRentEN
      }));
      res.status(200).json({typeOfRents : modifiedtypeOfRents});    
    }
    
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

