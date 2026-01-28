import axios from "axios";

export async function fetchOpenIssues(repo: string) {
  const response = await axios.get(
    `https://api.github.com/repos/${repo}/issues`,
    {
      params: {
        state: "open",
        per_page: 100,
      },
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  // Filter out PRs
  return response.data.filter((issue: any) => !issue.pull_request);
}
