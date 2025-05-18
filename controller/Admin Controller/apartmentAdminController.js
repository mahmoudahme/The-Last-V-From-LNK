import Apartment from "../../model/Apartment/Apartment.js";
import { ApiError } from "../../Utils/apiError.js";

export const createApartment= async(req , res , next)=>{
  try{
    const {apartmentNameEn , apartmentNameAr} = req.body ;
    const newApartment = new Apartment({
      apartmentNameEn : apartmentNameEn , 
      apartmentNameAr : apartmentNameAr
    })
    await newApartment.save();
    res.status(200).json({Message : "Apartment Created Successfully"});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getAllApartment = async(req , res , next )=>{
  try{
    const apartments = await Apartment.find();
    res.status(200).json({apartments : apartments})
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getAllOneApartment= async(req , res , next )=>{
  try{
    const apartmentID = req.params.id;
    const apartment = await Apartment.findById(apartmentID);
    res.status(200).json({apartment : apartment})
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const deleteApartment = async(req , res , next)=>{
  try {
    const apartmentId = req.params.id ;
    const apartment = await Apartment.findByIdAndDelete(apartmentId);
    res.status(200).json({Message : "apartment Deleted Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
};

export const updateApartment = async(req , res , next)=>{
  try {
    const apartmentId = req.params.id ;
    const updatedApartment = await Apartment.findByIdAndUpdate(apartmentId , req.body , {new : true});
    res.status(200).json({Message : "Apartment Updated Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
}