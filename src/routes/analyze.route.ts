import { Router } from "express";
import { analyzeRepoIssues } from "../controllers/analyze.controller";

const router = Router();

router.post("/", analyzeRepoIssues);

export default router;
