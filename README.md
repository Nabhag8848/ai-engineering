# AI Engineering Playground

This repo captures practical learnings from building with:

- OpenAI-compatible Responses API patterns (`basics/`)
- Model Context Protocol (MCP) servers (`mcp-servers/`)

## What We Learned

1. Use one client shape, swap providers with `baseURL`

- In `basics/`, the OpenAI SDK is used with OpenRouter via:
  - `baseURL: "https://openrouter.ai/api/v1"`
  - `apiKey: process.env.OPENROUTER_API_KEY`
- This keeps code portable while allowing model/provider flexibility.

2. Structured output is much more reliable with Zod

- `responses.parse(...)` + `zodTextFormat(...)` makes model output predictable.
- Defining schemas for events, entities, or reasoning steps prevents fragile string parsing.

3. Streaming is event-driven, not just "partial text"

- We handle events like:
  - `response.output_text.delta`
  - `response.output_text.done`
  - `response.refusal.delta`
- This is useful for live UX and progressive rendering.

4. Tool/function calling requires a full loop

- Define tool schemas strictly (`additionalProperties: false`, `strict: true` when possible).
- When a `function_call` appears:
  - parse arguments
  - execute local function
  - send `function_call_output` back to the model
- Then run a follow-up call so the model can produce the final user-facing response.

5. MCP tools feel like durable interfaces for LLM apps

- Both MCP servers register tools with typed input via Zod.
- `StdioServerTransport` is enough to run local servers and connect from MCP clients.
- Good tool descriptions + tight schemas strongly improve behavior.

6. External API MCP tools need explicit resilience

- The weather server shows practical handling for:
  - non-200 responses
  - missing fields
  - empty datasets
  - user-friendly fallback messages
- NWS coverage is US-only, so this limitation must be surfaced clearly.

7. Build and runtime details matter

- TypeScript is compiled to `build/` and executed as CLI tools.
- MCP server `build` scripts also mark binaries executable (`chmod 755`).

## Repository Structure

```text
.
├── basics/                   # Responses API + structured output + tool calling examples
│   ├── index.ts              # Base response calls, parse, streaming structured output
│   └── function-calling.ts   # Function/tool-calling patterns
├── mcp-servers/
│   ├── calculator/           # Simple arithmetic MCP server
│   └── weather/              # NWS-backed weather MCP server (US only)
└── README.md
```

## Quick Start

### 1. Basics (Responses API Experiments)

```bash
cd basics
cp .env.example .env
# add OPENROUTER_API_KEY to .env
npm install
npm run dev
# or
npm run dev:function
```

### 2. MCP Servers

```bash
cd mcp-servers/calculator
npm install
npm run build

cd ../weather
npm install
npm run build
```

## MCP Client Config Example

Use built server entrypoints in your MCP client config:

```json
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-servers/calculator/build/index.js"]
    },
    "weather": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-servers/weather/build/index.js"]
    }
  }
}
```
