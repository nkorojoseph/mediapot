import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const rows = await prisma.appSettings.findMany();
    // Convert [{ key, value }, ...] to an object { key: value, ... }
    const settings: Record<string, any> = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    return NextResponse.json(settings);
  } catch (err) {
    console.error('Failed to read app settings', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
