import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path"
import {fileURLToPath} from "url"
import { configDotenv } from "dotenv";
import { DBConnection } from "./config/DbConnection.js";
import { globalError } from "./middleware/errorMiddleware.js";
// import {addingResdientailListing} from "./controller/Listing Controllers/residentialController.js"
import cookieParser from "cookie-parser";
import authRouter from "./router/User Router/authRouter.js";
import userRouter from "./router/User Router/userRouter.js";
import subAccountRouter from "./router/User Router/SubAccounts Router/subAccountRouter.js"
// Sale Lising
import residentialRouter from "./router/User Router/Listing Routers/residentialRouter.js";
import commercialRouter from "./router/User Router/Listing Routers/commercialRouter.js";
import costalRouter from "./router/User Router/Listing Routers/costalRouter.js";

//Rent Listing 
import residentialRentRouter from "./router/User Router/Listing Rent Routers/residentialRentRouter.js";
import commercialRentRouter from "./router/User Router/Listing Rent Routers/commercialRentRouter.js";
import costalRentRouter from "./router/User Router/Listing Rent Routers/costalRentRouter.js";

//Sale Request
import residentialRouterRequest from "./router/User Router/Request Routers/residentialRouter.js";
import commercialRouterRequest from "./router/User Router/Request Routers/commercialRouter.js";
import costalRouterRequest from "./router/User Router/Request Routers/costalRouter.js";


//Rent Requests
import residentialRouterRentRequest from "./router/User Router/Request Rent Routers/residentialRouter.js" 
import costalRouterRentRequest from "./router/User Router/Request Rent Routers/costalRouter.js" 
import commercialRouterRentRequest from "./router/User Router/Request Rent Routers/commercialRouter.js" 

//Home Router 
import homeRouter from "./router/User Router/Home Router/homeRouter.js"


//City Router 
import cityRouter from "./router/User Router/Cities Routers/cityRouter.js";

//City Router 
import apartmentRouter from "./router/User Router/Apartments Routers/apartmentRouter.js";

//Finishing Router 
import finishingRouter from "./router/User Router/Finish Routers/finishingRouter.js";

//Finishing Router 
import furnisingRouter from "./router/User Router/Furnising Routers/furnisingRouter.js";

//Type Of Rent Router 
import typeOfRentRouter from "./router/User Router/Type Of Rent/typeOfRentRouter.js";

//Type Of Rent Router 
import AdditionalRouter from "./router/User Router/Additional Routers/AdditionalRouter.js";

//Location Router 
import locationRouter from "./router/User Router/Location Routers/locationRouter.js";

// Import Searching Router
import searchRouter from "./router/User Router/Search Router/searchRouter.js"

//Import Properties Router 
import propertiesRouter from "./router/User Router/PropertiesRouter/propertiesRouter.js"

//Import Properties Router 
import RequestPageRouter from "./router/User Router/RequestPageRouter/RequestPageRouter.js"

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////Admin Section ////////////////////////////////////
//Admin Authentication
import authAdminRouter from "./router/AdminRouter/authAdminRouter.js";
import userAdminRouter from "./router/AdminRouter/userAdminRouter.js";
//Location Router 
import locationAdminRouter from "./router/AdminRouter/locationAdminRouter.js";
//City Router 
import cityAdminRouter from "./router/AdminRouter/cityAdminRouter.js"
//Finishing Router 
import finishingAdminRouter from "./router/AdminRouter/finishingAdminRouter.js"
//Furnising Router 
import FurnisingAdminRouter from "./router/AdminRouter/FurnisingAdminRouter.js"
// Apartment Router
import apartmentAdminRouter from "./router/AdminRouter/apartmentAdminRouter.js"
// Type OF Rent Router
import typeOfRentAdminRouter from "./router/AdminRouter/typeOfRentAdminRouter.js"
// Additional Router
import AdditionalAdminRouter from "./router/AdminRouter/AdditionalAdminRouter.js"
/////////////////////////////////////////////////////////////////////////////
// Sale Lising Router 
import costalAdminRouter from "./router/AdminRouter/Sale Listing Admin Router/costalAdminRouter.js";
import residentialAdminRouter from "./router/AdminRouter/Sale Listing Admin Router/residentialAdminRouter.js";
import commercialAdminRouter from "./router/AdminRouter/Sale Listing Admin Router/commercialAdminRouter.js"
//////////////////////////////////
// Rent Lising Router 
import costalRentAdminRouter from "./router/AdminRouter/Rent Listing Admin Router/costalAdminRouter.js";
import residentialRentAdminRouter from "./router/AdminRouter/Rent Listing Admin Router/residentialAdminRouter.js";
import commercialRentAdminRouter from "./router/AdminRouter/Rent Listing Admin Router/commercialAdminRouter.js"
//////////////////////////////////
// ///Sale Request Router 
// import commercialRequestAdminRouter from './router/AdminRouter/Sale Request Admin Router/commercialAdminRouter.js';
// import costalRequestAdminRouter from './router/AdminRouter/Sale Request Admin Router/costalAdminRouter.js';
// import residentailRequestAdminRouter from './router/AdminRouter/Sale Request Admin Router/residentailAdminRouter.js'
// //////////////////////////////////
// // Rent Requests Router
// import commercialRequestRentAdminRouter from './router/AdminRouter/Rent Request Admin Router/commercialAdminRouter.js';
// import costalRequestRenttAdminRouter from './router/AdminRouter/Rent Request Admin Router/costalAdminRouter.js';
// import residentailRequestRentAdminRouter from './router/AdminRouter/Rent Request Admin Router/residentailAdminRouter.js'
// ////////////////////////////////// 

configDotenv({ path: "config/config.env" }); 
const app = express();
DBConnection();
// addingResdientailListing()
const PORT = process.env.PORT || 2000;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
app.use(express.static('public'));
app.use('/images', express.static(path.join(dirname, 'images')));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log("Mode : Development");
}

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/subaccount", subAccountRouter);


//Sale Listing EndPoints
app.use("/api/residential", residentialRouter);
app.use("/api/commercial", commercialRouter);
app.use("/api/costal", costalRouter);

//Rent Listing EndPoints
app.use("/api/residentialRent", residentialRentRouter);
app.use("/api/commercialRent", commercialRentRouter);
app.use("/api/costalRent", costalRentRouter);

//Sale Request EndPoints
app.use("/api/residentialRequest", residentialRouterRequest);
app.use("/api/commercialRequest", commercialRouterRequest);
app.use("/api/costalRequest", costalRouterRequest);

//Rent Request EndPoints
app.use("/api/residentialRentRequest", residentialRouterRentRequest);
app.use("/api/commercialRentRequest", commercialRouterRentRequest);
app.use("/api/costalRentRequest", costalRouterRentRequest);

//Home Endpoint 
app.use("/api/home" , homeRouter)

//City Endpoints 
app.use("/api/city" , cityRouter);

//Apartment Endpoints 
app.use("/api/apartment" , apartmentRouter);

//finishing Endpoints 
app.use("/api/finishing" , finishingRouter);

//Furnising Endpoints 
app.use("/api/furnising" , furnisingRouter);

//Type Of Rent Endpoints 
app.use("/api/typeOfRent" , typeOfRentRouter);

//Additional Endpoints 
app.use("/api/additional" , AdditionalRouter);

//Locations Endpoints 
app.use("/api/location" , locationRouter);

//Search Endpoints 
app.use("/api/search" , searchRouter);

//Properities Endpoints 
app.use("/api/properties" , propertiesRouter);

//Requests Endpoints 
app.use("/api/requests" , propertiesRouter);

////////////////////////////////////////////////////////////////////////
///////////////////////////// Admin EndPoints ///////////////////////////

app.use("/admin/auth/" , authAdminRouter);
app.use("/admin/user/" , userAdminRouter);
app.use("/admin/location/" , locationAdminRouter);
app.use("/admin/city/" , cityAdminRouter);
app.use("/admin/finishing/" , finishingAdminRouter);
app.use("/admin/furnising/" , FurnisingAdminRouter);
app.use("/admin/apartment/" , apartmentAdminRouter);
app.use("/admin/typeOfRent/" , typeOfRentAdminRouter);
app.use("/admin/additional/" , AdditionalAdminRouter);
app.use("/admin/sale/costal/" , costalAdminRouter);
app.use("/admin/sale/residential/" , residentialAdminRouter);
app.use("/admin/sale/commercial/" , commercialAdminRouter);
app.use("/admin/rent/costal/" , costalRentAdminRouter);
app.use("/admin/rent/residential/" , residentialRentAdminRouter);
app.use("/admin/rent/commercial/" , commercialRentAdminRouter);
// app.use("/admin/salerequest/costal/" , costalRequestAdminRouter);
// app.use("/admin/salerequest/residential/" , residentailRequestAdminRouter);
// app.use("/admin/salerequest/commercial/" , commercialRequestAdminRouter);
// app.use("/admin/rentrequest/costal/" , costalRequestRenttAdminRouter);
// app.use("/admin/rentrequest/residential/" , residentailRequestRentAdminRouter);
// app.use("/admin/rentrequest/commercial/" , commercialRequestRentAdminRouter);

//global error Middleware
app.use(globalError);

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
