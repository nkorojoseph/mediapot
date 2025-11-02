// app/page.tsx
import AppSettingsClient from './AppSettingsClient';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  // Read app settings directly via Prisma on the server to avoid calling
  // internal API routes which may be protected by auth middleware that
  // issues redirects (HTML) and would break JSON parsing.
  const rows = await prisma.appSettings.findMany();
  const appSettings: Record<string, any> = {};
  for (const r of rows) {
    appSettings[r.key] = r.value;
  }

  // Do not call /api/facebook/status from the server: that route may redirect
  // to a sign-in page when cookies/session are missing and would return HTML
  // (causing JSON.parse errors). The client component will fetch facebookStatus
  // after hydration where cookies are available.
  return <AppSettingsClient initialData={{ appSettings, facebookStatus: undefined }} />;
}
