import { Router } from "express"; 

// import {  } from "./store.controller.js";
import validator from "../../middlewares/validator.middleware.js"
import { storeSchemas } from "../../utils/validators.js"


export const router = Router();

// router.get("", validator(storeSchemas.get), );
