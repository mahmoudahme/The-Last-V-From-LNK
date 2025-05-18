import {filteration , filterationRent , filterationRentRequest , filterationRequest} from "../../../controller/User Controller/searchController.js";

import express from 'express' ;
const router = express.Router();


router.get("/salelist" , filteration );
router.get("/rentlist" , filterationRent);
router.get("/salerequest" , filterationRequest);
router.get("/rentrequest" , filterationRentRequest);



export default router;