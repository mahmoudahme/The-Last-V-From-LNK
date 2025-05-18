import { createFinishing , getAllFinishing , updateFinishing ,deleteFinishing, getOneFinishing } from "../../controller/Admin Controller/finishingController.js";

import { verifyAdmin } from "../../Utils/verifyToken.js";

import express from "express" ;
const router = express.Router() ;

router.get("/" , verifyAdmin,getAllFinishing);
router.get("/:id" , verifyAdmin,getAllFinishing);
router.post("/" ,verifyAdmin, createFinishing) ;
router.delete("/:id",verifyAdmin , deleteFinishing);
router.put("/:id",verifyAdmin , updateFinishing) ;

export default router ;