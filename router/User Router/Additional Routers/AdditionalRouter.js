import express from "express" ;
import {getAllAdditionals} from "../../../controller/User Controller/Additional/AdditionalController.js"

const router = express.Router();

router.get("/" , getAllAdditionals) ;

export default router;
