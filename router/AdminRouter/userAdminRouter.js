import express from "express";
import {getAllAccounts , getAllAdmin, getAllSoloAccounts, getFreelanceAccountById , getAgencyAccountById , getAllAgencyAccounts, updateActivation, updateUserData, deleteAnyUser, getOneAdmin, deleteAdmin, updateAdminData , createUser} from "../../controller/Admin Controller/userController.js" 
import { verifyAdmin } from "../../Utils/verifyToken.js";

const router = express.Router();


router.get("/" , verifyAdmin , getAllAccounts);
router.patch("/:id" , verifyAdmin , updateActivation);
router.put("/:id" , verifyAdmin , updateUserData);
router.delete("/:id" , verifyAdmin , deleteAnyUser)

//Create Accounts As Agency or Freelancer
router.post("/create" ,  verifyAdmin , createUser)

//Freelancers EndPoints
router.get("/freelancers" , verifyAdmin , getAllSoloAccounts);
router.get("/freelancers/:id" , verifyAdmin , getFreelanceAccountById);

//Agency EndPoints
router.get("/agency" , verifyAdmin ,getAllAgencyAccounts );
router.get("/agency/:id" , verifyAdmin ,getAgencyAccountById );

//Admins EndPoints
router.get("/admin" , verifyAdmin  , getAllAdmin);
router.get("/admin/:id" , verifyAdmin  , getOneAdmin);
router.put("/admin/:id" , verifyAdmin  , updateAdminData);
router.delete("/admin/:id" , verifyAdmin  , deleteAdmin);
export default router;