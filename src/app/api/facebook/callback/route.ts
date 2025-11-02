import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeForShortLivedToken,
  exchangeForLongLivedToken,
  getUserPages,
  getPageAccessToken,
} from '@/integrations/facebook';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL('/settings', req.url));
  }

  try {
    const shortTokenResp = await exchangeCodeForShortLivedToken(code);
    const shortToken = shortTokenResp.access_token;

    const longTokenResp = await exchangeForLongLivedToken(shortToken);
    const longToken = longTokenResp.access_token;

    // Fetch pages the user manages
    const pagesResp = await getUserPages(longToken);
    const pages = pagesResp.data || [];

    // Pick first page and get its page access token
    let pageAccessToken = '';
    if (pages.length > 0) {
      const pageId = pages[0].id;
      const pageTokenResp = await getPageAccessToken(pageId, longToken);
      pageAccessToken = pageTokenResp.access_token || '';
    }

    const response = NextResponse.redirect(new URL('/(signedInUser)/settings', req.url));
    // Set HttpOnly cookie with page token (short-lived or long-lived as needed)
    response.cookies.set('fb_page_token', pageAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return response;
  } catch (err) {
    return NextResponse.redirect(new URL('/(signedInUser)/settings?error=fb', req.url));
  }
}
