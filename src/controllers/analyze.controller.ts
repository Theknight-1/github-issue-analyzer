import { Request, Response } from "express";
import { analyzeIssuesForRepo } from "../services/analyze.service";

export async function analyzeRepoIssues(req: Request, res: Response) {
  const { repo, prompt } = req.body;

  if (!repo || !prompt) {
    return res.status(400).json({
      error: "repo and prompt are required",
    });
  }

  try {
    const analysis = await analyzeIssuesForRepo(repo, prompt);
    return res.json({ analysis });
  } catch (error: any) {
    console.error("Analyze controller error:", error.message);

    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to analyze issues",
    });
  }
}
