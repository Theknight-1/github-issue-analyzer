import { Request, Response } from "express";
import prisma from "../db/prisma";
import { fetchOpenIssues } from "../services/github.service";

export async function scanRepo(req: Request, res: Response) {
  const { repo } = req.body;

  if (!repo || typeof repo !== "string") {
    return res.status(400).json({
      error: "repo must be provided in the format owner/repo",
    });
  }

  try {
    const issues = await fetchOpenIssues(repo);

    // Clear existing cache
    await prisma.issue.deleteMany({
      where: { repo },
    });

    if (issues.length > 0) {
      await prisma.issue.createMany({
        data: issues.map((issue: any) => ({
          id: BigInt(issue.id),
          repo,
          title: issue.title,
          body: issue.body,
          htmlUrl: issue.html_url,
          createdAt: new Date(issue.created_at),
        })),
      });
    }

    return res.json({
      repo,
      issues_fetched: issues.length,
      cached_successfully: true,
    });
  } catch (error) {
    console.error("Scan controller error:", error);
    return res.status(500).json({
      error: "Failed to fetch or cache GitHub issues",
    });
  }
}
