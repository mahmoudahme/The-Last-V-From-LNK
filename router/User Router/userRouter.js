import  express  from "express";
import {verifyToken} from "../../Utils/verifyToken.js"
import {getUserById , updateUser} from "../../controller/User Controller/userController.js";

const router = express.Router();

router.get("/", verifyToken, getUserById);
router.put("/", verifyToken, updateUser);

export default router