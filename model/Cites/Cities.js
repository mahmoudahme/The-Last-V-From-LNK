import mongoose from "mongoose";
const CitySchema = new mongoose.Schema({
  cityNameEn  : {
    type : String , 
    required : true ,
  },
  cityNameAr : {
    type : String , 
    required : true ,
  }
}, {timestamps : true }) ;

export default mongoose.model("Cities" , CitySchema)