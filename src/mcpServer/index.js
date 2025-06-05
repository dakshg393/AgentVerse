import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { z } from 'zod';
import cors from 'cors'

const server = new McpServer({
  name: 'example-server',
  version: '1.0.0',
});

// ... set up server resources, tools, and prompts ...



const app = express();


const allowedOrigin  = 'https://agentverse-chi.vercel.app/'

app.use(cors({
  origin:allowedOrigin,
  credentials:true
}))

app.use(express.json());

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

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports = {};

app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);

  transports[transport.sessionId] = transport;

  console.log('New client connected with sessionId:', transport.sessionId);
  res.on('close', () => {
    delete transports[transport.sessionId];
    console.log('session deletated');
  });
  await server.connect(transport);
});

app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(process.env.PORT || 10000 , () => {
  console.log('Server is running on http://localhost:3001');
});

// import express from 'express';
// import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
// import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
// import { z } from 'zod';

// const app = express();
// app.use(express.json()); // to handle JSON in POST

// const server = new McpServer({
//   name: 'example-server',
//   version: '1.0.0',
// });

// // Add your tool
// server.tool(
//   'addTwoNumbers',
//   'Add two numbers',
//   {
//     a: z.number(),
//     b: z.number(),
//   },
//   async (arg) => {
//     const { a, b } = arg;
//     return {
//       content: [
//         {
//           type: 'text',
//           text: `The sum of ${a} and ${b} is ${a + b}`,
//         },
//       ],
//     };
//   }
// );

// // Store transports by custom sessionId from client
// const transports = new Map();

// app.get('/sse', async (req, res) => {
//   const clientSessionId = req.query.sessionId;

//   if (!clientSessionId) {
//     return res.status(400).send('Missing sessionId');
//   }

//   const transport = new SSEServerTransport('/messages', res);

//   // Store using the sessionId sent by the client
//   transports.set(clientSessionId, transport);

//   console.log('New client connected with sessionId:', clientSessionId);

//   res.on('close', () => {
//     transports.delete(clientSessionId);
//     console.log('Session closed:', clientSessionId);
//   });

//   await server.connect(transport);
// });

// app.post('/messages', async (req, res) => {
//   const sessionId = req.query.sessionId;

//   if (!sessionId || !transports.has(sessionId)) {
//     return res.status(400).send('No transport found for sessionId');
//   }

//   const transport = transports.get(sessionId);
//   await transport.handlePostMessage(req, res);
// });

// app.listen(3001, () => {
//   console.log('MCP Server running at http://localhost:3001');
// });
