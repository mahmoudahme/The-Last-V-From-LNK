import express from "express";
import {createResdientailRequest , getAllMyResidentailRequest , getOneResidentailRequest , getAllResidentailRequests , deleteResidentailRequests , updateResidentailRequest } 
from "../../../controller/User Controller/Request Controllers/residentialController.js";

const router = express.Router();



router.post("/",createResdientailRequest)
router.get("/" ,getAllResidentailRequests)
router.get("/:id", getAllMyResidentailRequest)
router.get("/request/:listid", getOneResidentailRequest)
router.put("/:id", updateResidentailRequest)
router.delete("/:id", deleteResidentailRequests)

export default router