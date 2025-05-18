import express from "express" ;
import {getFeeds , getMyFeeds} from "../../../controller/User Controller/PropertiesController/propertiesController.js"
import {verifyToken} from "../../../Utils/verifyToken.js"
const router = express.Router() ;


router.get("/feed" , verifyToken , getFeeds) ;
router.get("/myfeed" , verifyToken , getMyFeeds) ;

export default router ;