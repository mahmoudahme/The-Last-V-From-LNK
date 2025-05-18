import Furnising from "../../model/Furnising/Furnising.js";
import { ApiError } from "../../Utils/apiError.js";

export const createFurnising= async(req , res , next)=>{
  try{
    const {furnisingEN , furnisingAR} = req.body ;
    const newFurnising = new Furnising({
      furnisingEN : furnisingEN , 
      furnisingAR : furnisingAR
    })
    await newFurnising.save();
    res.status(200).json({Message : "Furnising Created Successfully"});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getAllFurnising= async(req , res , next )=>{
  try{
    const Furnisings = await Furnising.find();
    res.status(200).json({Furnisings : Furnisings});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getOneFurnising = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const furnising = await Furnising.findById(id) ;
    res.status(200).json({furnising : furnising}) 
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500))
  }
}

export const deleteFurnising= async(req , res , next)=>{
  try {
    const FurnisingId = req.params.id ;
    const furnising = await Furnising.findByIdAndDelete(FurnisingId);
    res.status(200).json({Message : "Furnising Deleted Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
};

export const updateFurnising= async(req , res , next)=>{
  try {
    const FurnisingId = req.params.id ;
    const updatedFurnising= await Furnising.findByIdAndUpdate(FurnisingId , req.body , {new : true});
    res.status(200).json({Message : "Furnising Updated Successfully" , Furnising : updatedFurnising });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
}