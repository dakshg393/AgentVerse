// // app/api/c/chat/route.ts
// import { NextResponse } from 'next/server';
// import { Client } from '@modelcontextprotocol/sdk/client';
// import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse';
// import { GoogleGenAI } from '@google/genai';
// // import redis from '@/lib/redis';
// import redis from '@/lib/server/redis';


// let mcpClient: Client;
// let aiInstance: GoogleGenAI;
// let tools: any[] = [];


// async function initializeMCP(sessionId) {
//   if (!mcpClient) {
//     mcpClient = new Client({
//       name: 'example-client',
//       version: '1.0.0',
//     });

//     const url = new URL(process.env.MCP_SERVER_URL!); //! This marks assure typescript that value of mcp serverurl is not null
//     url.searchParams.set('sessionId', sessionId);

//     await mcpClient.connect(new SSEClientTransport(url));
//     //await mcpClient.connect(new SSEClientTransport(new URL(process.env.MCP_SERVER_URL)));

//     const toolsResponse = await mcpClient.listTools();
//     tools = toolsResponse.tools.map((tool) => ({
//       name: tool.name,
//       description: tool.description,
//       parameters: {
//         type: 'object',
//         properties: Object.fromEntries(
//           Object.entries(tool.inputSchema.properties).map(([name, schema]: [string, any]) => [
//             name,
//             {
//               type: schema.type,
//               description: schema.description ?? '',
//             },
//           ])
//         ),
//         required: tool.inputSchema.required ?? [],
//       },
//     }));

//     aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     // await initializeMCP();

//     const { message, sessionId, prompt } = await req.json();
//     // console.log(`Here are json details ${message} session id ${sessionId} ${prompt}, ${message}`);

//     await initializeMCP(sessionId);

//     const historyKey = `chat:${sessionId}`;
//     const historyJSON = await redis.get(historyKey);

//     let chatHistory = historyJSON ? JSON.parse(historyJSON) : [];

//     const updatedHistory = [
//       ...chatHistory,
//       {
//         role: 'user',
//         parts: [{ text: message, type: 'text' }],
//       },
//     ];

//     let currentHistory = updatedHistory;
//     let functionCall;

//     do {
//       const response = await aiInstance.models.generateContent({
//         model: 'gemini-2.0-flash',
//         contents: [
//           {
//             role: 'model',
//             parts: [
//               {
//                 text: `${prompt}`,
//                 type: 'text',
//               },
//             ],
//           },
//           ...currentHistory,
//         ],
//         config: {
//           tools: [
//             {
//               functionDeclarations: tools,
//             },
//           ],
//         },
//       });

//       const candidate = response.candidates[0].content;
//       const part = candidate.parts[0];
//       functionCall = part.functionCall;
//       const responseText = part.text;

//       if (functionCall) {
//         currentHistory.push({
//           role: 'model',
//           parts: [{ text: `Calling tool: ${functionCall.name}`, type: 'text' }],
//         });

//         const toolResult = await mcpClient.callTool({
//           name: functionCall.name,
//           arguments: functionCall.args,
//         });

//         currentHistory.push({
//           role: 'user',
//           parts: [
//             {
//               text: `Tool result: ${toolResult.content[0].text}`,
//               type: 'text',
//             },
//           ],
//         });
//       } else {
//         currentHistory.push({
//           role: 'model',
//           parts: [{ text: responseText, type: 'text' }],
//         });
//       }
//     } while (functionCall);

//     await redis.set(historyKey, JSON.stringify(currentHistory), 'EX', 1800);

//     return NextResponse.json({
//       response: currentHistory.at(-1).parts[0].text,
//       chatHistory: currentHistory,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: `Failed to process chat request ${error}` }, { status: 500 });
//   }
// }





import { NextResponse } from 'next/server';
import { Client } from '@modelcontextprotocol/sdk/client';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse';
import { GoogleGenAI } from '@google/genai';
import redis from '@/lib/server/redis';

export async function POST(req: Request) {
  try {
    const { message, sessionId, prompt } = await req.json();

    // ✅ Initialize Gemini
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    // ✅ Directly use models.generateContent
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // or gemini-pro or gemini-1.0-pro
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response';

    return NextResponse.json({
      response: text,
    });
  } catch (error: any) {
    console.error('Chat processing error:', error);
    return NextResponse.json(
      { error: `Failed to process chat request: ${error.message}` },
      { status: 500 }
    );
  }
}
