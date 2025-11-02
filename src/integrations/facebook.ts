import 'server-only';

const FB_API_VERSION = 'v24.0';

function getRedirectUri() {
  return (
    process.env.FACEBOOK_OAUTH_REDIRECT_URI ||
    `${process.env.APP_URL || 'http://localhost:3000'}/api/facebook/callback`
  );
}

export function getFacebookOAuthUrl(state?: string) {
  const clientId = process.env.FACEBOOK_APP_ID;
  const redirectUri = getRedirectUri();
  const scope = [
    'pages_show_list',
    'pages_read_engagement',
    'pages_manage_posts',
    // 'public_profile',
    'pages_manage_metadata',
    'pages_read_user_content',
    'pages_manage_engagement',
  ].join(',');

  const url = new URL(`https://www.facebook.com/${FB_API_VERSION}/dialog/oauth`);
  url.searchParams.set('client_id', clientId || '');
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', scope);
  url.searchParams.set('response_type', 'code');
  if (state) url.searchParams.set('state', state);
  return url.toString();
}

export async function exchangeCodeForShortLivedToken(code: string) {
  const clientId = process.env.FACEBOOK_APP_ID;
  const clientSecret = process.env.FACEBOOK_APP_SECRET;
  const redirectUri = getRedirectUri();

  const url = new URL(`https://graph.facebook.com/${FB_API_VERSION}/oauth/access_token`);
  url.searchParams.set('client_id', clientId || '');
  url.searchParams.set('client_secret', clientSecret || '');
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('code', code);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to exchange code for token');
  return res.json();
}

export async function exchangeForLongLivedToken(shortLivedToken: string) {
  const clientId = process.env.FACEBOOK_APP_ID;
  const clientSecret = process.env.FACEBOOK_APP_SECRET;

  const url = new URL(`https://graph.facebook.com/${FB_API_VERSION}/oauth/access_token`);
  url.searchParams.set('grant_type', 'fb_exchange_token');
  url.searchParams.set('client_id', clientId || '');
  url.searchParams.set('client_secret', clientSecret || '');
  url.searchParams.set('fb_exchange_token', shortLivedToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to exchange for long-lived token');
  return res.json();
}

export async function getUserPages(userAccessToken: string) {
  const url = new URL(`https://graph.facebook.com/${FB_API_VERSION}/me/accounts`);
  url.searchParams.set('access_token', userAccessToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
}

export async function getPageAccessToken(pageId: string, userAccessToken: string) {
  const url = new URL(`https://graph.facebook.com/${FB_API_VERSION}/${pageId}`);
  url.searchParams.set('fields', 'access_token');
  url.searchParams.set('access_token', userAccessToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch page access token');
  return res.json();
}
