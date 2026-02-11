import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import z from "zod";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const responseApi = async () => {
  const response = await client.responses.create({
    model: "arcee-ai/trinity-large-preview:free",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  response.output.forEach((o) => console.log(JSON.stringify(o, null, 2)));
};

const structureOutput = async () => {
  const CalendarEvent = z.object({
    name: z.string(),
    date: z.string(),
    participants: z.array(z.string()),
  });

  const response = await client.responses.parse({
    model: "arcee-ai/trinity-large-preview:free",
    input: [
      { role: "system", content: "Extract the event information." },
      {
        role: "user",
        content: "Alice and Bob are going to a science fair on Friday.",
      },
    ],
    text: {
      format: zodTextFormat(CalendarEvent, "event"),
    },
  });

  console.log(response.output_parsed);
};

const chainOfThoughts = async () => {
  const Step = z.object({
    explanation: z.string(),
    output: z.string(),
  });

  const MathReasoning = z.object({
    steps: z.array(Step),
    final_answer: z.string(),
  });

  const response = await client.responses.parse({
    model: "arcee-ai/trinity-large-preview:free",
    input: [
      {
        role: "system",
        content:
          "You are a helpful math tutor. Guide the user through the solution step by step.",
      },
      { role: "user", content: "how can I solve 8x + 7 = -23" },
    ],
    text: {
      format: zodTextFormat(MathReasoning, "math_reasoning"),
    },
  });

  const math_reasoning = response.output_parsed;
  console.log(JSON.stringify(math_reasoning, null, 2));
};

const streamingWithStructuredOutput = async () => {
  const EntitiesSchema = z.object({
    attributes: z.array(z.string()),
    colors: z.array(z.string()),
    animals: z.array(z.string()),
  });

  const stream = client.responses
    .stream({
      model: "arcee-ai/trinity-large-preview:free",
      input: [
        { role: "user", content: "Lion roars and has yellowish color similar to cheetah" },
      ],
      text: {
        format: zodTextFormat(EntitiesSchema, "entities"),
      },
    })
    .on("response.refusal.delta", (event) => {
      process.stdout.write(event.delta);
    })
    .on("response.output_text.delta", (event) => {
      process.stdout.write(event.delta);
    })
    .on("response.output_text.done", () => {
      process.stdout.write("\n");
    });

  const result = await stream.finalResponse();

  console.log(JSON.stringify(result, null, 2));
};

async function main() {
  streamingWithStructuredOutput();
}

main().catch(console.error);
