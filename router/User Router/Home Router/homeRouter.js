import {getListing} from "../../../controller/User Controller/HomeController/homeController.js";
import express from "express" ;

const router = express.Router();

router.get("/" , getListing);


export default router ;