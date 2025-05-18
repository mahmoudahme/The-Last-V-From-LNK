import mongoose from "mongoose";

const FinishingSchema = new mongoose.Schema({
  finishingEn : {
    type : String,
    required : true
  } ,
  finishingAr : {
    type : String , 
    required : true 
  },
} , {timestamps : true}) ;

export default mongoose.model("Finishing" , FinishingSchema) ;
















