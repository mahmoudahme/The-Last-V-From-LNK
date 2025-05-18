import express from "express";
import {getAllRents ,getOneRent , getRentsOfUser , updateRent , deleteRent} from "../../../controller/Admin Controller/RentListAdminController/costalAdminController.js"
import {verifyAdmin} from "../../../Utils/verifyToken.js";

const router = express.Router();

router.get("/" , verifyAdmin , getAllRents);
router.get("/:id" , verifyAdmin , getOneRent);
router.get("/user/:id" , verifyAdmin , getRentsOfUser);
router.put("/:id" , verifyAdmin , updateRent);
router.delete("/:id" , verifyAdmin , deleteRent);

export default router ;