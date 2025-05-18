import { createSubAccount , getMySubAccounts , getSubAccountById , deleteSubAccount } from "../../../controller/User Controller/SubAccounts Controller/subAccountController.js";

import { verifyToken } from "../../../Utils/verifyToken.js";

import express from "express" ;
const router = express.Router() ;

router.post("/" , verifyToken , createSubAccount) ;
router.get("/" , verifyToken , getMySubAccounts) ;
router.get("/:id" , verifyToken , getSubAccountById) ;
router.delete("/:id" , verifyToken , deleteSubAccount) ;


export default router ;