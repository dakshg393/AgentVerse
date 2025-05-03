import { NextResponse } from 'next/server';
import { transports } from '@/lib/server/(mcp)/mcp-server.js';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  const transport = transports.get(sessionId);
  if (!transport) {
    return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 });
  }

  try {
    const body = await request.text();
    await transport.handleMessage(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
