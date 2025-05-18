import Cities from "../../../model/Cites/Cities.js";
import { ApiError } from "../../../Utils/apiError.js";

export const getAllCities = async (req, res, next) => {
  try {
    const lang = req.query.lang;
    if (lang == "ar") {
      const cities = await Cities.find().select("cityNameAr");
      const modifiedCities = cities.map((city) => ({
        id: city._id,
        name: city.cityNameAr,
      }));
      res.status(200).json({ cities: modifiedCities });
    } else {
      const cities = await Cities.find().select("cityNameEn");
      const modifiedCities = cities.map((city) => ({
        id: city._id,
        name: city.cityNameEn,
      }));
      res.status(200).json({ cities: modifiedCities });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getOneCity = async (req, res, next) => {
  try {
    const lang = req.query.lang;
    const id = req.params.id;
    if(lang == "en"){
      const city = await Cities.findById(id).select("_id cityNameEn");
      const modifiedCity = {
        id: city._id,
        name: city.cityNameEn
      }
      res.status(200).json({city : modifiedCity})
    }else{
      const city = await Cities.findById(id).select("_id cityNameAr");
      const modifiedCity = {
        id: city._id,
        name: city.cityNameAr
      }
      res.status(200).json({city : modifiedCity})
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};
