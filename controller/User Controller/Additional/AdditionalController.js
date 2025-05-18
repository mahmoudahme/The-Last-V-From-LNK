import Additional from "../../../model/Additional/Additional.js"
import { ApiError } from "../../../Utils/apiError.js"

export const getAllAdditionals = async (req, res , next) => {
  try { 
    const lang = req.query.lang; 
    if(lang == "en"){
      const Additionals = await Additional.find().select("nameEn");
      const modifyAdditional= Additionals.map(additional=>{
        return {
          _id : additional._id ,
          name: additional.nameEn
        }
      });
      res.status(200).json({Additionals : modifyAdditional})
    }else{
      const additionals = await Additional.find().select("nameAr");
      const modifyadditionals = additionals.map(additional=>{
        return {
          _id : additional._id ,
          name: additional.nameAr
        }
      });
      res.status(200).json({Additionals : modifyadditionals})
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500))
  }
}