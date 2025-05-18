import { getAllFinishing } from "../../../controller/User Controller/Finishing/finishController.js";

import { verifyToken } from "../../../Utils/verifyToken.js";

import express from "express" ;
const router = express.Router() ;

router.get("/" , getAllFinishing);


export default router ;