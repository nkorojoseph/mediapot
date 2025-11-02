import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL || 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
    'X-Title': process.env.APP_NAME || 'MediaPot',
  },
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a social media post generator.' },
        {
          role: 'user',
          content:
            'Write a social media post about AI in marketing. Limit it to 200 words or fewer.',
        },
        { role: 'user', content: prompt },
      ],
      max_completion_tokens: 150,
    });
    const message = completion.choices[0].message.content;
    return NextResponse.json({ content: message });
  } catch (error) {
    let errorMessage = 'Error generating content.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
