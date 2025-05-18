import {getAllApartment  } from "../../../controller/User Controller/Apartment/ApartmentController.js";

import { verifyToken } from "../../../Utils/verifyToken.js";

import express from "express" ;
const router = express.Router() ;

router.get("/" , getAllApartment);


export default router ;