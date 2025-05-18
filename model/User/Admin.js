import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  typeOfUser : {
    type : String,
    default : "Admin"
  },
  name : {
    type : String , 
    required : true 
  },
  email : {
    type : String , 
    required : true ,
    unique : true
  }, 
  password : {
    type : String , 
    required : true 
  } ,
  role :{
    type : String , 
    required : true 
  }
} , {timestamps : true}) ;
export default mongoose.model('Admin' , AdminSchema) ; 