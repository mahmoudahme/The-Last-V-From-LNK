import mongoose from "mongoose";
const ApartmentSchema = new mongoose.Schema({
  apartmentNameEn  : {
    type : String , 
    required : true ,
    unique : true 
  },
  apartmentNameAr : {
    type : String , 
    required : true ,
    unique : true 
  }
}, {timestamps : true }) ;

export default mongoose.model("Apartment" , ApartmentSchema)