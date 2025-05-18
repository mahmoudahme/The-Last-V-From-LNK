import Locations from "../../model/Locations/Locations.js"; 
import {ApiError} from "../../Utils/apiError.js";
import fs from "fs" ;
import path from "path" ;
import xlsx from "xlsx";
import {fileURLToPath} from "url"




export const addLocations =async()=>{
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);
  const excelFilePath = path.join(dirname, 'New Microsoft Excel Worksheet.xlsx');
  
  const workbook = xlsx.readFile(excelFilePath);
  
  // اختيار أول ورقة عمل
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // const data = xlsx.utils.
  // // تحويل البيانات إلى JSON
  const data = xlsx.utils.sheet_to_json(sheet, { header: 2});
  
  for(var i = 0 ; i < data.length ; i++ ){
    console.log(data[i]);
    const location = new Locations({nameAr : data[i].nameAr , nameEn : data[i].nameEn , city : data[i].city});
     await location.save();
  }
} 



export const createLocation = async(req , res , next)=>{
  try {
    const {nameAr , nameEn , city} = req.body ;
    const newLocation = new Locations({
      nameAr : nameAr ,
      nameEn : nameEn ,
      city : city
    });
    await newLocation.save();
    res.status(200).json({Message : "New Location Added" , location : newLocation});
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500))
  }
};

export const getAllLocations = async(req, res , next)=>{
  try{
    const locations = await Locations.find();
    res.status(200).json({Locations : locations });
  }catch(error){
    return next(new ApiError(`Server Error ${error}` , 500))
  }
};

export const getOneLocation = async(req , res , next)=>{
  try{
    const id = req.params.id ;
    const location = await Locations.findById(id);
    res.status(200).json({location : location});
  }catch(error){
    return next(new ApiError(`Server Error ${error}` , 500))
  }
};

export const updateLocation = async(req , res , next)=>{
  try {
    const id = req.params.id ;
    const location = await Locations.findById(id);
    if(location){
      const updatedLocation = await Locations.findByIdAndUpdate(id , {$set : req.body} , {new : true });
      res.status(200).json({Message : "Location Updated" , location : updatedLocation});
    }else{
      return res.status(404).json({Message : "Loaction Not Found"})
    }
   
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500))
  }
};

export const deleteLocation = async(req , res , next)=>{
  try {
    const id = req.params.id; 
    const location = await Locations.findById(id);
    if(location){
      await Locations.findByIdAndDelete(id);
      res.status(200).json({Message : "Location Deleted Successfully"});
    }else{
      return res.status(404).json({Message : "Location Not Found"})
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}` , 500))
  }
}