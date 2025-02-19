import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const {
    from, to, code,
  } = await request.json();
  const syntaxCheckResult = await openai.chat.completions.create({
    model: 'o1-mini',
    messages: [
      {
        role: 'user',
        content: 'If there is a syntax error in this code, return true. If not, return false without any additional explanation.',
      },
      {
        role: 'user',
        content: code,
      },
    ],
    store: false,
  });
  if (syntaxCheckResult.choices[0].message.content === 'true') {
    return NextResponse.json(null);
  }
  const result = await openai.chat.completions.create({
    model: 'o1-mini',
    messages: [
      {
        role: 'user',
        content: `I have the following code. It is in programming language ${from}. Please convert it to another programming language ${to}.`,
      },
      {
        role: 'user',
        content: code,
      },
      {
        role: 'assistant',
        content: 'Please give me only the code as text, without any additional explanation.',
      },
    ],
    store: false,
  });

  return NextResponse.json(result);
}
