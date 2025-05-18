import TypeOfRent from "../../model/Type Of Rent/TypeOfRent.js";
import { ApiError } from "../../Utils/apiError.js";

export const createTypeOfRent= async(req , res , next)=>{
  try{
    const {typeOfRentEN , typeOfRentAR} = req.body ;
    const newFinishing = new TypeOfRent({
      typeOfRentEN : typeOfRentEN , 
      typeOfRentAR : typeOfRentAR
    })
    await newFinishing.save();
    res.status(200).json({Message : "Type Of Rent Created Successfully"});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getAllTypeOfRent= async(req , res , next )=>{
  try{
    const TypeOFRents = await TypeOfRent.find();
    res.status(200).json({TypeOFRents : TypeOFRents})
    
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getOneTypeOfRent= async(req , res , next )=>{
  try{
    const typeOFRentID = req.params.id ;
    const typeOFRent = await TypeOfRent.findById(typeOFRentID);
    res.status(200).json({typeOFRent : typeOFRent})
    
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const deleteTypeOfRent = async(req , res , next)=>{
  try {
    const finishingId = req.params.id ;
    const TypeOfRents = await TypeOfRent.findByIdAndDelete(finishingId);
    res.status(200).json({Message : "TypeOfRent Deleted Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
};

export const updateTypeOfRents= async(req , res , next)=>{
  try {
    const finishingId = req.params.id ;
    const updatedFurnising = await TypeOfRent.findByIdAndUpdate(finishingId , req.body , {new : true});
    res.status(200).json({Message : "TypeOfRents Updated Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
}