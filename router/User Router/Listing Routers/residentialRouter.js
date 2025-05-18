import express from "express";
import {createResdientailListing , getAllMyResidentailListing , getAllResidentailListing , getOneResidentailListing, deleteResidentailListing , updateResidentailListing} 
from "../../../controller/User Controller/Listing Controllers/residentialController.js";

const router = express.Router();


router.post("/",createResdientailListing)
router.get("/" ,getAllResidentailListing)
router.get("/:id", getAllMyResidentailListing)
router.get("/list/:listid", getOneResidentailListing)
router.put("/:id", updateResidentailListing)
router.delete("/:id", deleteResidentailListing)

export default router