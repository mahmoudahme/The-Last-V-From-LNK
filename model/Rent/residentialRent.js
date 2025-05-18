import mongoose from "mongoose";
const residentialRent = new mongoose.Schema(
  {
    typeOfList: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
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
    typeOfRent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeOFRent",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    insurance: {
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
    view: {
      type: Number,
      default: 0,
    },
    click: {
      type: Number,
      default: 0,
    },
    typeOfPublish: {
      type: String,
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

export default mongoose.model("residentialRent", residentialRent);
