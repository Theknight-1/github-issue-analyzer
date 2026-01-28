import axios from "axios";

export async function analyzeWithLLM(prompt: string): Promise<string> {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "phi3:mini",
      prompt,
      stream: false,
    },
    {
      timeout: 60_000, // 60 seconds
    },
  );

  return response.data.response;
}
