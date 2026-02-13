# AI Engineering Playground

This repo captures practical learnings from building with:

- OpenAI-compatible Responses API patterns (`basics/`)
- Model Context Protocol (MCP) servers (`mcp-servers/`)
- OpenAI Agents SDK patterns (`agents/`)

## What We've Learned So Far

### Technical Understanding

1. One SDK client shape can support multiple providers.
- In `basics/`, the OpenAI SDK is configured with OpenRouter using `baseURL` + API key.
- This keeps app code mostly provider-agnostic.

2. Structured outputs are significantly more reliable than free-form text.
- `responses.parse(...)` with `zodTextFormat(...)` makes outputs type-safe and predictable.
- This avoids brittle post-processing and reduces parsing bugs.

3. Streaming should be handled as an event protocol.
- We handle events like `response.output_text.delta`, `response.output_text.done`, and `response.refusal.delta`.
- This enables responsive UIs and better error/refusal handling.

4. Tool calling is a workflow, not a single API call.
- Define tools with strict schemas (`required`, `additionalProperties: false`, `strict: true` when possible).
- Run the full loop: detect `function_call` -> execute function -> return `function_call_output` -> request final answer.

5. MCP servers provide clean boundaries for capabilities.
- Calculator and weather servers expose typed tools via Zod input schemas.
- `StdioServerTransport` is enough for local development and integration with MCP clients.

6. External API tools need defensive engineering.
- The weather server handles non-200 responses, missing fields, empty results, and fallback messages.
- NWS being US-only is a product constraint that must be explicit in tool behavior and docs.

7. Agents SDK enables multi-agent orchestration patterns.
- A triage agent can route user queries to specialized agents (e.g., NL2SQL, Math Tutor) via handoffs.
- Agents can also be composed as tools using `asTool()`, giving a parent agent callable sub-agents.
- Input and output guardrails provide safety layers with fallback strategies for resilience.

8. Build/runtime packaging details affect reliability.
- TypeScript compiles to `build/`, and MCP servers run as CLI entrypoints.
- Build scripts that set executable permissions (`chmod 755`) reduce integration friction.

### Non-Technical Understanding

1. Clear contracts reduce team ambiguity.
- Schema-first design (Zod + tool contracts) improves shared understanding between prompt design, backend logic, and client integration.

2. Constraints should be communicated early.
- Stating limits like "US-only weather coverage" upfront avoids user confusion and support churn.

3. Iterative examples accelerate learning.
- Small, focused experiments (`basics/` first, then MCP servers) made it easier to validate ideas before scaling complexity.

4. Reliability is also a UX decision.
- Friendly fallback messages and explicit refusal/error paths build trust even when systems cannot fulfill a request.

5. Portability is a strategic advantage.
- Keeping provider-specific details in configuration makes future model/provider changes less risky and cheaper.

## Repository Structure

```text
.
├── basics/                   # Responses API + structured output + tool calling examples
│   ├── index.ts              # Base response calls, parse, streaming structured output
│   └── function-calling.ts   # Function/tool-calling patterns
├── mcp-servers/
│   ├── calculator/           # Simple arithmetic MCP server
│   └── weather/              # NWS-backed weather MCP server (US only)
├── agents/
│   ├── index.ts              # Echolalia agent, NL2SQL agent with tools, triage orchestration
│   ├── manager.ts            # Agents-as-tools pattern (booking + refund sub-agents)
│   └── exception.ts          # Input/output guardrails with fallback strategies
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

### 3. Agents SDK

```bash
cd agents
cp .env.example .env
# add OPENAI_API_KEY to .env
npm install
npm run dev              # triage orchestration (handoffs)
npm run dev:manager      # agents-as-tools pattern
npm run dev:exception    # guardrails with fallback
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
