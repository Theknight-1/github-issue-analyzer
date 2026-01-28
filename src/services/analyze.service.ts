import { getCachedIssues } from "./issue.service";
import { analyzeWithLLM } from "./llm.service";
import { chunkArray, truncate } from "../utils/chunk";
import { buildFinalAnalysisPrompt } from "../prompts/issueAnalysis.prompt";
import { buildChunkPrompt } from "../prompts/issueChunk.prompt";

const MAX_ISSUES = 3;
const MAX_BODY_LENGTH = 500;

export async function analyzeIssuesForRepo(
  repo: string,
  userPrompt: string
) {
  const issues = await getCachedIssues(repo);

  if (issues.length === 0) {
    throw new Error("No cached issues found. Please scan the repo first.");
  }

  // Limit issues and truncate content to control context size
  const issuesForAnalysis = issues.slice(0, MAX_ISSUES).map(issue => ({
    title: issue.title,
    body: truncate(issue.body ?? "", MAX_BODY_LENGTH),
  }));

  const prompt = `
You are an experienced open-source project maintainer.

Analyze the following GitHub issues from the repository "${repo}"
and respond to the user's request.

User request:
"${userPrompt}"

Issues:
${issuesForAnalysis
  .map(
    (issue, i) => `
${i + 1}. ${issue.title}
${issue.body}
`
  )
  .join("\n")}

RESPONSE FORMAT (MANDATORY):
Return your answer strictly in Markdown using the following structure:

## Summary
One short paragraph summarizing the overall state.

## Key Themes
- Bullet points describing recurring problems or patterns.
- Group related issues where applicable.

## Recommendations
- Clear, actionable steps maintainers should prioritize.
- Focus on impact and urgency.

Do not include any text outside this structure.
Be concise, practical, and maintainer-focused.
`;

  return analyzeWithLLM(prompt);
}
