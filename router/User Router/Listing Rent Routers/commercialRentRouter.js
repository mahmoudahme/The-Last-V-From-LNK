import express from "express";
import {createCommercialRentListing , getAllCommercialRentListing , getAllMyCommercialRentListing , getOneCommercialRentListing , updateCommercialRentListing , deleteCommercialRentListing} 
from "../../../controller/User Controller/Listing Rent Controllers/commercialRentController.js";

const router = express.Router();

router.post("/",createCommercialRentListing)
router.get("/" ,getAllCommercialRentListing)
router.get("/:id", getAllMyCommercialRentListing)
router.get("/list/:listid", getOneCommercialRentListing)
router.put("/:id", updateCommercialRentListing)
router.delete("/:id", deleteCommercialRentListing)

export default router