import express from "express" ;
import {verifyAdmin} from "../../Utils/verifyToken.js";
import {createAdditional , getAllAdditional , getOneAdditional , updateAdditional , deleteAdditional} from "../../controller/Admin Controller/AdditionalController.js";

const router = express.Router();

router.use(verifyAdmin) ;

router.post("/" , createAdditional);
router.get("/" , getAllAdditional);
router.get("/:id" , getOneAdditional);
router.put("/:id", updateAdditional);
router.delete("/:id" , deleteAdditional);

export default router ;