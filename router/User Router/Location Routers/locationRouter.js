import express from "express" ;
import {gerAllLocatioons, getAllLocationWithCountryId} from "../../../controller/User Controller/locationController/locationController.js"

const router = express.Router();

router.get("/" , gerAllLocatioons) ;
router.get("/:id" , getAllLocationWithCountryId) ;

export default router;
