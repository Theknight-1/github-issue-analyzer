import { Router } from "express";
import { scanRepo } from "../controllers/scan.controller";

const router = Router();

router.post("/", scanRepo);

export default router;
