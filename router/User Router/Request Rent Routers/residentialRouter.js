import express from "express";
import {createResdientailRentRequest , getAllMyResidentailRentRequest , getAllResidentailRentRequests , getOneResidentailRentRequest , updateResidentailRentRequest , deleteResidentailRentRequests } 
from "../../../controller/User Controller/Request Rent Controllers/residentialRentController.js";

const router = express.Router();



router.post("/",createResdientailRentRequest )
router.get("/" ,getAllResidentailRentRequests )
router.get("/:id", getAllMyResidentailRentRequest)
router.get("/request/:listid", getOneResidentailRentRequest)
router.put("/:id", updateResidentailRentRequest)
router.delete("/:id", deleteResidentailRentRequests)

export default router