import { NextResponse } from 'next/server';

export function apiResponse(message: string, data: object, status: number = 500) {
  return NextResponse.json({ message, data }, { status });
}
