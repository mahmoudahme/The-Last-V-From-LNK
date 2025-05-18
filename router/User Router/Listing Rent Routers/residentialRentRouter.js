import express from "express";
import {createResdientailRentListing , getAllMyResidentailRentListing , getAllResidentailRentListing , getOneResidentailRentListing , updateResidentailRentListing , deleteResidentailRentListing} 
from "../../../controller/User Controller/Listing Rent Controllers/residentialRentController.js";

const router = express.Router();



router.post("/", createResdientailRentListing)
router.get("/" ,getAllResidentailRentListing)
router.get("/:id", getAllMyResidentailRentListing)
router.get("/list/:listid", getOneResidentailRentListing)
router.put("/:id", updateResidentailRentListing)
router.delete("/:id", deleteResidentailRentListing)

export default router