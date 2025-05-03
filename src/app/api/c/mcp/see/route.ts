import { NextResponse } from 'next/server';
import { server, transports } from '@/lib/server/(mcp)/mcp-server.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

// export async function GET() {
//   const { readable, writable } = new TransformStream();
//   const encoder = new TextEncoder();
//   const writer = writable.getWriter();

//   const transport = new SSEServerTransport('/messages', {
//     write: (chunk) => writer.write(encoder.encode(chunk)),
//     end: () => writer.close(),
//   });

//   transports.set(transport.sessionId, transport);

//   const response = new NextResponse(readable, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       'Cache-Control': 'no-cache',
//       Connection: 'keep-alive',
//     },
//   });

//   server.connect(transport).catch((err) => {
//     console.error('Connection error:', err);
//     transports.delete(transport.sessionId);
//   });

//   // Handle client disconnect
//   response.signal.onabort = () => {
//     transports.delete(transport.sessionId);
//     writer.close();
//   };

//   return response;
// }

export async function GET(request: Request) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const encoder = new TextEncoder();

  const write = (data: string) => {
    writer.write(encoder.encode(`data: ${data}\n\n`));
  };

  // Send a test message
  write('connected');

  // Handle client disconnect
  request.signal?.addEventListener('abort', () => {
    writer.close();
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
