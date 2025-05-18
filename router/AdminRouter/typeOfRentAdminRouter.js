import express from "express" ;
import{createTypeOfRent , getAllTypeOfRent , getOneTypeOfRent , updateTypeOfRents , deleteTypeOfRent} from "../../controller/Admin Controller/typeOfRentAdminController.js";
import {verifyAdmin} from "../../Utils/verifyToken.js";

const router = express.Router() ;

router.post("/" , verifyAdmin , createTypeOfRent) ;
router.get("/" , verifyAdmin , getAllTypeOfRent) ;
router.get("/:id" , verifyAdmin , getOneTypeOfRent) ;
router.put("/:id" , verifyAdmin , updateTypeOfRents) ;
router.delete("/:id" , verifyAdmin , deleteTypeOfRent) ;


export default router ;