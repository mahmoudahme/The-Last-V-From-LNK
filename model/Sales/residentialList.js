import mongoose from "mongoose";
const residentialList = new mongoose.Schema(
  {
    typeOfList: {
      type: String,
      required: true,
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cities",
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locations",
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    bathRooms: {
      type: Number,
      required: true,
    },
    reseptionPieces: {
      type: Number,
      required: true,
    },
    balcona: {
      type: Number,
      required: true,
    },
    finishing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Finishing",
      required: true,
    },
    furnising: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Furnishing",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    typeOfPay: {
      type: String,
      required: true,
    },
    Downpayment: {
      type: Number,
    },
    years: {
      type: Number,
    },
    additional: {
      type: Array,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    typeOfPublish: {
      type: String,
    },
    view: {
      type: Number,
      default: 0,
    },
    click: {
      type: Number,
      default: 0,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    AgencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("residentialList", residentialList);
