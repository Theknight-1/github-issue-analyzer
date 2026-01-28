export function buildFinalAnalysisPrompt(
  repo: string,
  userPrompt: string,
  summaries: string[]
) {
  return `
You are an experienced open-source project maintainer.

Below are summaries of issue groups from the repository "${repo}".

Summaries:
${summaries.map((s, i) => `${i + 1}. ${s}`).join("\n")}

User request:
"${userPrompt}"

Based on these summaries:
- Identify the most critical recurring issues
- Recommend what maintainers should prioritize and why
- Be concise and actionable
`;
}
