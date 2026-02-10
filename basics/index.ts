import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main() {
  const response = await client.responses.create({
    model: "arcee-ai/trinity-large-preview:free",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  response.output.forEach((o) => console.log(JSON.stringify(o, null, 2)));
}

main().catch(console.error);
