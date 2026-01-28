export function buildChunkPrompt(
  repo: string,
  issues: {
    title: string;
    body: string | null;
  }[],
): string {
  return `
You are analyzing a subset of GitHub issues from the repository "${repo}".

Your task:
- Identify key problems or themes in these issues
- Summarize them concisely
- Do NOT propose final priorities yet

Issues:
${issues
  .map(
    (issue, i) => `
${i + 1}. ${issue.title}
${issue.body || "No description"}
`,
  )
  .join("\n")}

Return a short summary of the themes you observe.
`;
}
