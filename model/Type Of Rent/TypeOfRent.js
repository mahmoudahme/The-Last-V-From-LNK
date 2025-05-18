import mongoose from "mongoose";

const TypeOfRentSchema = new mongoose.Schema({
  typeOfRentAR : {
    type : String , 
    required : true 
  }, 
  typeOfRentEN: {
    type : String , 
    required : true 
  } 
}, {timestamps : true}) ;

export default mongoose.model("TypeOFRent" , TypeOfRentSchema);