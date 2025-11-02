import { NextResponse } from 'next/server';
import 'server-only';
// This route returns whether the user has a connected Facebook page and its basic metadata.
// It reads an HttpOnly cookie named `fb_page_token` which should hold a page access token
// (set by the OAuth callback). We never return tokens to the client — only metadata.

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader
        .split(';')
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => {
          const [k, ...v] = c.split('=');
          return [k, decodeURIComponent(v.join('='))];
        })
    );

    const pageAccessToken = cookies['fb_page_token'];

    if (!pageAccessToken) {
      return NextResponse.json({ connected: false });
    }

    // If a page token was stored, attempt to fetch page metadata (id & name).
    // We call the Graph API endpoint /me?fields=id,name using the page token.
    const res = await fetch(
      `https://graph.facebook.com/v24.0/me?fields=id,name&access_token=${encodeURIComponent(
        pageAccessToken
      )}`
    );

    if (!res.ok) {
      // Token might be expired or invalid; return connected: false so UI shows Connect.
      return NextResponse.json({ connected: false });
    }

    const data = await res.json();
    const page = data && (data.id || data.name) ? { id: data.id, name: data.name } : undefined;

    return NextResponse.json({ connected: true, page });
  } catch (err) {
    console.error('Error in facebook status route', err);
    return NextResponse.json({ connected: false });
  }
}
