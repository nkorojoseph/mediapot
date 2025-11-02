import 'server-only';
import OpenAI from 'openai';
import { env } from 'process';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL, // Optional: Use a custom base URL if needed
  defaultHeaders: {
    'HTTP-Referer': env.APP_URL || 'http://localhost:3000',
    'X-Title': env.APP_NAME || 'MediaPost',
  },
});

export async function getCompletion(promt: string) {
  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4o',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  });
  return completion;
}
