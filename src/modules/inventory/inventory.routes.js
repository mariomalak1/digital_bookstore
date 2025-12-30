import { Router } from "express"; 
import multer from "multer";
import { uploadInventory } from "./inventory.controller.js"; 

const upload = multer({ dest: 'uploads/' })
export const router = Router();

router.post("/upload/",  upload.single('file'), uploadInventory);
