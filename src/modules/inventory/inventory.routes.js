import { Router } from "express";
import multer from "multer";
import { uploadInventory } from "./inventory.controller.js";

const csvFileFilter = (req, file, cb) => {
	const allowedMimes = [
		'text/csv',
		'application/csv',
		'application/vnd.ms-excel',
		'text/plain',
	];
	const isCsvMime = allowedMimes.includes(file.mimetype);
	const isCsvExt = file.originalname && file.originalname.toLowerCase().endsWith('.csv');
	if (isCsvMime || isCsvExt) cb(null, true);
	else cb(new Error('Only CSV files are allowed'), false);
};

const upload = multer({ dest: 'uploads/', fileFilter: csvFileFilter });
export const router = Router();

router.post('/upload/', upload.single('file'), uploadInventory);
