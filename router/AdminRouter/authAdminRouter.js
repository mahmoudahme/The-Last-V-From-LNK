import { register , login , logout , getAdmin} from "../../controller/Admin Controller/authAdminController.js";
import {verifyAdmin} from "../../Utils/verifyToken.js";

import express from "express";

const router = express.Router();

router.post("/register" ,verifyAdmin, register) ;
router.post("/login" , login) ;
router.post("/logout", logout) ;
router.get("/me" , verifyAdmin , getAdmin);

export default router ;
