import express from "express";
import {createCostalListing , getAllCostalListing , getAllMyCostalListing , getOneCostalListing,deleteCostalListing,updateCostalListing} 
from "../../../controller/User Controller/Listing Controllers/costalController.js";


const router = express.Router();


router.post("/", createCostalListing)
router.get("/" ,getAllCostalListing)
router.get("/:id", getAllMyCostalListing)
router.get("/list/:listid", getOneCostalListing)
router.put("/:id", updateCostalListing)
router.delete("/:id", deleteCostalListing)

export default router