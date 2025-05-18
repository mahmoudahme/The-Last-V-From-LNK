import express from "express";
import {getAllListing ,getOneList , getListingOfUser , updateList , deleteList} from "../../../controller/Admin Controller/SaleListingAdminController/costalAdminController.js"
import {verifyAdmin} from "../../../Utils/verifyToken.js";

const router = express.Router();

router.get("/" , verifyAdmin , getAllListing);
router.get("/:id" , verifyAdmin , getOneList);
router.get("/user/:id" , verifyAdmin , getListingOfUser);
router.put("/:id" , verifyAdmin , updateList);
router.delete("/:id" , verifyAdmin , deleteList);

export default router ;