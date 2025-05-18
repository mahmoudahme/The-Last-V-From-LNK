import express from "express" ;
import {getRequests , getMyRequests} from "../../../controller/User Controller/Requests Page Controllers/requestPageConrtoller.js"
import {verifyToken} from "../../../Utils/verifyToken.js"
const router = express.Router() ;


router.get("/feed" , verifyToken , getRequests) ;
router.get("/myRequest" , verifyToken , getMyRequests) ;

export default router ;