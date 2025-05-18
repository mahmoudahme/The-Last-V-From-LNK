import express from "express";
import {createCommercailRentRequest , getAllCommercailRentRequests, getAllMyCommercailRentRequest, getOneCommercailRentRequest , updateCommercailRentRequest , deleteCommercailRentRequests } 
from "../../../controller/User Controller/Request Rent Controllers/commercialRentController.js";

const router = express.Router();



router.post("/",createCommercailRentRequest )
router.get("/" ,getAllCommercailRentRequests )
router.get("/:id", getAllMyCommercailRentRequest)
router.get("/request/:listid", getOneCommercailRentRequest)
router.put("/:id", updateCommercailRentRequest)
router.delete("/:id", deleteCommercailRentRequests)

export default router