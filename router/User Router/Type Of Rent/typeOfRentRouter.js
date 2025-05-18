import { getAllTypeOfRent } from "../../../controller/User Controller/Type Of Rent/typeOfRentController.js";

import { verifyToken } from "../../../Utils/verifyToken.js";

import express from "express" ;
const router = express.Router() ;

router.get("/" , getAllTypeOfRent);


export default router ;