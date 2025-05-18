import {   getAllCities , getOneCity } from "../../../controller/User Controller/Cities/cityController.js";

import { verifyToken } from "../../../Utils/verifyToken.js";

import express from "express" ;
const router = express.Router() ;

router.get("/" , getAllCities);
router.get("/:id" , getOneCity);

export default router ;