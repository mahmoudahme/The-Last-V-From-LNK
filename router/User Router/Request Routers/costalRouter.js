import express from "express";
import {createCostalRequest , getAllCostalRequests , getAllMyCostalRequest , getOneCostalRequest , updateCostalRequest , deleteCostalRequests } 
from "../../../controller/User Controller/Request Controllers/costalController.js";

const router = express.Router();



router.post("/",createCostalRequest)
router.get("/" ,getAllCostalRequests)
router.get("/:id", getAllMyCostalRequest)
router.get("/request/:listid", getOneCostalRequest)
router.put("/:id", updateCostalRequest)
router.delete("/:id", deleteCostalRequests)

export default router