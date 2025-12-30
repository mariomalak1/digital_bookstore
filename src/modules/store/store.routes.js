import { Router } from "express"; 

import { getStoreReports } from "./store.controller.js";

export const router = Router();

router.get('/:id/download-report', getStoreReports);

