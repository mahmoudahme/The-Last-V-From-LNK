import express from "express";
import {
    register ,
    login ,
    logout,
    verifyOTP,
    forgetPassword ,
    changePassword ,
    getAllOTPs
} 
from "../../controller/User Controller/authController.js";

import { verifyToken } from "../../Utils/verifyToken.js";

const router = express.Router();
router.post('/verifyOTP', verifyOTP);
router.post("/register", register)
router.post("/login" , login)
router.post("/logout",logout);
router.post("/forgetPass" , forgetPassword)
router.put("/changePassword" ,  changePassword)
router.get("/otps" , getAllOTPs)
export default router
