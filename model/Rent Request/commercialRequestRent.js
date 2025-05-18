import mongoose from "mongoose";
import { type } from "os";
const commercialRequestRent = new mongoose.Schema(
  {
    typeOfRequest: {
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
    finishing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Finishing",
      required: true,
    },

    typeOfRent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeOFRent",
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
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

export default mongoose.model("commercialRequestRent", commercialRequestRent);
