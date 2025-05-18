import { getAllFurnising } from "../../../controller/User Controller/Furnising/furnisingController.js";

import { verifyToken } from "../../../Utils/verifyToken.js";

import express from "express" ;
const router = express.Router() ;

router.get("/" , getAllFurnising);


export default router ;