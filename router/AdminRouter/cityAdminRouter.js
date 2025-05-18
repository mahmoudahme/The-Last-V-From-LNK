import express from "express";
import {verifyAdmin} from "../../Utils/verifyToken.js";
import {getAllCities , getOneCity , updateCity , deleteCity , createCity} from "../../controller/Admin Controller/cityAdminController.js"
const router = express.Router();

router.post("/" , verifyAdmin , createCity);
router.get("/" , verifyAdmin , getAllCities);
router.get("/:id" ,verifyAdmin , getOneCity);
router.put("/:id" , verifyAdmin , updateCity);
router.delete("/:id" , verifyAdmin, deleteCity) ;

export default router;