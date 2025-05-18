import mongoose from "mongoose" ;

const locationSchema = new mongoose.Schema({
  nameAr : {
    type : String , 
    required : true
  }, 
  nameEn : {
    type : String , 
    required : true 
  }, 
  city : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "Cities"
  }
} , {timestamps : true});

export default mongoose.model("Locations" , locationSchema);