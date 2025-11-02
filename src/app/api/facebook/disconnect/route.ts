import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('fb_page_token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
