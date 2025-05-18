import express from "express";
import {verifyAdmin} from "../../Utils/verifyToken.js";
import {createLocation , getAllLocations , getOneLocation, updateLocation , deleteLocation} from "../../controller/Admin Controller/locationController.js"
const router = express.Router();

router.post("/" , verifyAdmin , createLocation);
router.get("/" , verifyAdmin , getAllLocations);
router.get("/:id" , verifyAdmin , getOneLocation);
router.put("/:id" , verifyAdmin , updateLocation);
router.delete("/:id" , verifyAdmin , deleteLocation);

export default router;