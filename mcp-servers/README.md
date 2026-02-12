# MCP Servers

This repository contains two Model Context Protocol (MCP) servers that can be used with Claude and other MCP-compatible clients.

## Servers

### Calculator

A simple arithmetic MCP server providing basic math operations.

**Tools:**

| Tool | Description | Parameters |
|------|-------------|------------|
| `add_two_numbers` | Add two numbers together | `a` (number), `b` (number) |

**Usage:**
```bash
cd calculator
npm install
npm run build
```

### Weather

A weather information server using the US National Weather Service API.

**Tools:**

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_alerts` | Get weather alerts for a US state | `state` (two-letter state code, e.g., CA, NY) |
| `get_forecast` | Get weather forecast for a location | `latitude` (-90 to 90), `longitude` (-180 to 180) |

**Note:** Only works for US locations due to NWS API limitations.

**Usage:**
```bash
cd weather
npm install
npm run build
```

## Requirements

- Node.js v16+
- npm

## MCP Client Configuration

Add the servers to your MCP client configuration:

```json
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/path/to/mcp-servers/calculator/build/index.js"]
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/mcp-servers/weather/build/index.js"]
    }
  }
}
```

## License

MIT
