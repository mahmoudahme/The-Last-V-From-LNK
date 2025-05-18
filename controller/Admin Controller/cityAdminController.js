import Cities from "../../model/Cites/Cities.js";
import { ApiError } from "../../Utils/apiError.js";

export const createCity = async(req , res , next)=>{
  try{
    const {cityNameEn , cityNameAr} = req.body ;
    const newCity = new Cities({
      cityNameEn : cityNameEn , 
      cityNameAr : cityNameAr
    })
    await newCity.save(); 
    res.status(200).json({Message : "City Created Successfully"});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getAllCities = async(req , res , next )=>{
  try{
    const cities = await Cities.find();
    res.status(200).json({cities : cities});
  }catch(error){
    return next(new ApiError(`Server Error ${error}`, 500))
  }
};

export const getOneCity = async(req , res , next)=>{
  try{
    const id = req.params.id ;
    const city = await Cities.findById(id);
    if(!city){
      return res.status(404).json({Message : "City NoT Found"})
    }else{
      res.status(200).json({city : city});
    }
  }catch(error){
    return next(new ApiError(`Server error ${error}` , 500));
  }
}

export const deleteCity = async(req , res , next)=>{
  try {
    const cityId = req.params.id ;
    const city = await Cities.findByIdAndDelete(cityId);
    res.status(200).json({Message : "City Deleted Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
};

export const updateCity = async(req , res , next)=>{
  try {
    const cityId = req.params.id ;
    const updatedCity = await Cities.findByIdAndUpdate(cityId , req.body , {new : true});
    res.status(200).json({Message : "City Updated Successfully"});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` ,500 ))
  }
}