import Finishing from "../../../model/Finishing/Finishing.js";
import { ApiError } from "../../../Utils/apiError.js";

export const getAllFinishing= async(req , res , next )=>{
  try{
    const lang = req.query.lang ;
    if(lang == "ar"){
      const finishings = await Finishing.find().select("finishingAr");
      const modifiedFinishing = finishings.map(finishing => ({
        id : finishing._id ,
        name: finishing.finishingAr
      }));
      res.status(200).json({finishings : modifiedFinishing});
    }else{
      const finishings = await Finishing.find().select("finishingEn");
      const modifiedFinishing = finishings.map(finishing => ({
        id : finishing._id ,
        name: finishing.finishingEn
      }));
      res.status(200).json({finishings : modifiedFinishing});    }
    
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

