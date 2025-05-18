import mongoose ,{Schema , model}from "mongoose" ;

const AdditionalSchema = new Schema({
  nameAr : {
    type: String , 
    required : true 
  }, 
  nameEn : {
    type : String , 
    required : true 
  }
} , {timestamps : true}) ;

export default model("Additional" , AdditionalSchema) ;