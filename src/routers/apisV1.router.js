import {Router} from "express"; 

import { router as storeRouter } from "../modules/store/store.routers.js";

export const router = Router();

router.use("/stores", storeRouter);