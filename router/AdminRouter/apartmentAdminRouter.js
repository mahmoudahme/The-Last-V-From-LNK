import express from "express" ;
import {createApartment , getAllApartment , getAllOneApartment , updateApartment , deleteApartment} from "../../controller/Admin Controller/apartmentAdminController.js"
import {verifyAdmin} from "../../Utils/verifyToken.js";
const router = express.Router();

router.post("/",verifyAdmin , createApartment);
router.get("/",verifyAdmin , getAllApartment);
router.get("/:id",verifyAdmin , getAllOneApartment);
router.put("/:id",verifyAdmin , updateApartment);
router.delete("/:id" ,verifyAdmin ,deleteApartment);


export default router ;