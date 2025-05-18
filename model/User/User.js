import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    typeOfUser:{
      type : String ,
    },
    isAdmin : {
      type : Boolean ,
      default :  false
    },
    image : {
      type : String ,
    },
    name: {
      type: String,
    },
    email: {
      type: String, 
      unique: true,
    },
    phone :{
      type : String ,
      unique: true,
    },
    password: { 
      type: String,
    },
    city :{
      type :mongoose.Schema.Types.ObjectId ,
      ref : "Cities" ,
    },
    address:{
      type : String ,
    },
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locations",
      }
    ],
    activation : {
      type : Boolean ,
      default : true 
    },
    Limits :{
      type : Number ,
      default : 0 
    },
    UserId : {
      type :mongoose.Schema.Types.ObjectId ,
      ref : "User"
    } ,
    otp : {
      type : Number ,
    } ,
    received :{
      type : Number ,
      default : 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
