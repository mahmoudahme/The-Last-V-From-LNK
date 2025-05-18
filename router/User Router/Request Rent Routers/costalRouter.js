import express from "express";
import {createCostalRentRequest , getAllCostalRentRequests , getAllMyCostalRentRequest , getOneCostalRentRequest , deleteCostalRentRequests , updateCostalRentRequest  } 
from "../../../controller/User Controller/Request Rent Controllers/costalRentController.js";

const router = express.Router();



router.post("/",createCostalRentRequest )
router.get("/" ,getAllCostalRentRequests )
router.get("/:id", getAllMyCostalRentRequest )
router.get("/request/:listid", getOneCostalRentRequest)
router.put("/:id", updateCostalRentRequest)
router.delete("/:id", deleteCostalRentRequests)

export default router