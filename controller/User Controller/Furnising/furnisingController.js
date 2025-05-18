import Furnising from "../../../model/Furnising/Furnising.js";
import { ApiError } from "../../../Utils/apiError.js";


export const getAllFurnising= async(req , res , next )=>{
  try{
    const lang = req.query.lang ;
    if(lang == "ar"){
      const Furnisings = await Furnising.find().select("furnisingAR");
      const modifiedFurnisings = Furnisings.map(furnising => ({
        id : furnising._id ,
        name: furnising.furnisingAR
      }));
      res.status(200).json({finishings : modifiedFurnisings});
    }else{
      const Furnisings = await Furnising.find().select("furnisingEN");
      const modifiedFurnisings = Furnisings.map(finishing => ({
        id : finishing._id ,
        name: finishing.furnisingEN
      }));
      res.status(200).json({finishings : modifiedFurnisings});    
    }
    
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};
