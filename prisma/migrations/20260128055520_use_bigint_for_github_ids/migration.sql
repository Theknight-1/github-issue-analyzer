-- CreateTable
CREATE TABLE "Issue" (
    "id" BIGINT NOT NULL,
    "repo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "htmlUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Issue_repo_idx" ON "Issue"("repo");
