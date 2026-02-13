import { Agent, run, Runner } from "@openai/agents";

async function main() {
  const bookingAgent = new Agent({
    name: "Booking expert",
    instructions: "Answer booking questions and modify reservations.",
  });

  const refundAgent = new Agent({
    name: "Refund expert",
    instructions: "Help customers process refunds and credits.",
  });

  const customerFacingAgent = new Agent({
    name: "Customer-facing agent",
    instructions:
      "Talk to the user directly. When they need booking or refund help, call the matching tool.",
    tools: [
      bookingAgent.asTool({
        toolName: "booking_expert",
        toolDescription: "Handles booking questions and requests.",
      }),
      refundAgent.asTool({
        toolName: "refund_expert",
        toolDescription: "Handles refund questions and requests.",
      }),
    ],
  });

  const runner = new Runner();

  const result = await runner.run(
    customerFacingAgent,
    "Can you reserve a table for 4 ?",
  );
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
