import prisma from "../db/prisma";

export async function getCachedIssues(repo: string) {
  return prisma.issue.findMany({
    where: { repo },
    select: {
      title: true,
      body: true,
      htmlUrl: true,
    },
  });
}
