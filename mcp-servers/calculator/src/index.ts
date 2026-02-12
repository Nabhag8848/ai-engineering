import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport,  } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";

const server = new McpServer({
  name: "calculator",
  version: "1.0.0",
});

server.registerTool(
  "add_two_numbers",
  {
    description: "Add two numbers",
    inputSchema: {
      a: z.number().describe("The first number to add"),
      b: z.number().describe("The second number to add"),
    },
  },
  ({ a, b }) => {
    return {
      content: [{ type: "text", text: `The sum of ${a} and ${b} is ${a + b}` }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
