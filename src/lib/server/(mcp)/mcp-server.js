// lib/mcp-server.js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { z } from 'zod';

// Create singleton server instance
const server = new McpServer({
  name: 'example-server',
  version: '1.0.0',
});

// Initialize server tools
server.tool(
  'addTwoNumbers',
  'Add two numbers',
  {
    a: z.number(),
    b: z.number(),
  },
  async (arg) => {
    const { a, b } = arg;
    return {
      content: [
        {
          type: 'text',
          text: `The sum of ${a} and ${b} is ${a + b}`,
        },
      ],
    };
  }
);

// Shared transports map
const transports = new Map();

export { server, transports };
