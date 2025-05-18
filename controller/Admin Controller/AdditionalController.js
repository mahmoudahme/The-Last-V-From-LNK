import Additional from "../../model/Additional/Additional.js";
import { ApiError} from "../../Utils/apiError.js"

export const createAdditional = async(req , res , next)=>{
  try{
    const {nameAr , nameEn} = req.body ;
    const newAdditional = new Additional({
      nameAr ,
      nameEn ,
    }); 
    await newAdditional.save() ;
    res.status(201).json({message : "Additional created successfully" , data : newAdditional});
  }catch(error){
    return next(new ApiError(`Server Error ${error}` , 500)) ;
  }
};

export const getAllAdditional = async(req , res , next)=>{
  try {
    const Additionals = await Additional.find() ;
    res.status(200).json({Additionals : Additionals}) ;
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500)) ;
  }
}

export const getOneAdditional = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const additional = await Additional.findById(id) ;
    if(!additional){
      return next(new ApiError(`Additional not found` , 404)) ;
    }
    res.status(200).json({additional : additional}) ;
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500)) ;
  }
}

export const updateAdditional = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const updatedAdditional = await Additional.findByIdAndUpdate(id , {$set : req.body} , {new : true});
    if(!updatedAdditional){
      return next(new ApiError(`Additional not found` , 404)) ;
      }
    res.status(200).json({message : "Additional updated successfully" , data : updatedAdditional});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500)) ;
  }
}

export const deleteAdditional = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const deletedAdditional = await Additional.findByIdAndDelete(id);
    if(!deletedAdditional){
      return next(new ApiError(`Additional not found` , 404)) ;
      }
    res.status(200).json({message : "Additional Deleted successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500)) ;
  }
}