import { NextResponse } from 'next/server';
import { getFacebookOAuthUrl } from '@/integrations/facebook';

export async function GET() {
  const url = getFacebookOAuthUrl();
  return NextResponse.redirect(url);
}
