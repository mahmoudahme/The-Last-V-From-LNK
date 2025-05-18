import express from "express";
import {createCommercialListing , getAllCommercialListing , getAllMyCommercialListing , getOneCommercialListing, deleteCommercialListing , updateCommercialListing} 
from "../../../controller/User Controller/Listing Controllers/commercialController.js";


const router = express.Router();

router.post("/",createCommercialListing)
router.get("/" ,getAllCommercialListing)
router.get("/:id", getAllMyCommercialListing)
router.get("/list/:listid", getOneCommercialListing)
router.put("/:id", updateCommercialListing)
router.delete("/:id", deleteCommercialListing)

export default router