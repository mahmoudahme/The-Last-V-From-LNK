import express from "express";
import {createCostalRentListing , getAllCostalRentListing , getAllMyCostalRentListing , updateCostalRentListing , deleteCostalRentListing  ,  getOneCostalRentListing} 
from "../../../controller/User Controller/Listing Rent Controllers/costalRentController.js";


const router = express.Router();



router.post("/", createCostalRentListing)
router.get("/" ,getAllCostalRentListing)
router.get("/:id", getAllMyCostalRentListing)
router.get("/list/:listid", getOneCostalRentListing)
router.put("/:id", updateCostalRentListing)
router.delete("/:id", deleteCostalRentListing)

export default router