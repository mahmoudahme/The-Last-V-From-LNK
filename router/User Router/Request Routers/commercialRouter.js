import express from "express";
import {createCommercialRequest , getAllCommercialRequests, getAllMyCommercialRequests , getOneCommercialRequest , updateCommercialRequest , deleteCommercialRequests } 
from "../../../controller/User Controller/Request Controllers/commercialController.js";

const router = express.Router();



router.post("/",createCommercialRequest)
router.get("/" ,getAllCommercialRequests)
router.get("/:id", getAllMyCommercialRequests)
router.get("/request/:listid", getOneCommercialRequest)
router.put("/:id", updateCommercialRequest)
router.delete("/:id", deleteCommercialRequests)

export default router