import mongoose from "mongoose";

const furnisingSchema = new mongoose.Schema({
  furnisingEN : {
    type : String , 
    required : true 
  },
  furnisingAR : {
    type : String , 
    required : true 
  }
} , {timestamps : true });

export default mongoose.model("Furnishing" , furnisingSchema);
