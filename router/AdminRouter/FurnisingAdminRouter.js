import express from "express";
import {getAllFurnising , getOneFurnising , createFurnising , deleteFurnising , updateFurnising} from "../../controller/Admin Controller/FurnishingAdminController.js" ;
import {verifyAdmin} from "../../Utils/verifyToken.js"
const router = express.Router() ;

router.post("/" , verifyAdmin , createFurnising);
router.get("/" , verifyAdmin , getAllFurnising);
router.get("/:id" , verifyAdmin , getOneFurnising);
router.put("/:id" , verifyAdmin , updateFurnising);
router.delete("/:id" , verifyAdmin , deleteFurnising);



export default router ;