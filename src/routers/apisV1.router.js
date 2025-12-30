import {Router} from "express"; 

import { router as storeRoutes } from "../modules/store/store.routes.js";
import { router as inventoryRoutes } from "../modules/inventory/inventory.routes.js";

export const router = Router();

router.use("/stores", storeRoutes);
router.use("/inventory", inventoryRoutes);
