import Finishing from "../../model/Finishing/Finishing.js";
import { ApiError } from "../../Utils/apiError.js";

export const createFinishing= async(req , res , next)=>{
  try{
    const {finishingEn , finishingAr} = req.body ;
    const newFinishing = new Finishing({
      finishingEn : finishingEn , 
      finishingAr : finishingAr
    })
    await newFinishing.save();
    res.status(200).json({Message : "Finishing Created Successfully"});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getAllFinishing= async(req , res , next )=>{
  try{
    const finishing = await Finishing.find();
    res.status(200).json({finishing : finishing});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getOneFinishing = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const finishing = await Finishing.findById(id) ;
    res.status(200).json({finishing : finishing}) 
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500))
  }
}

export const deleteFinishing = async(req , res , next)=>{
  try {
    const finishingId = req.params.id ;
    const finishing = await Finishing.findByIdAndDelete(finishingId);
    res.status(200).json({Message : "finishing Deleted Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
};

export const updateFinishing = async(req , res , next)=>{
  try {
    const finishingId = req.params.id ;
    const updatedFinishing = await Finishing.findByIdAndUpdate(finishingId , req.body , {new : true});
    res.status(200).json({Message : "Finishing Updated Successfully" , finishing : updatedFinishing });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
}