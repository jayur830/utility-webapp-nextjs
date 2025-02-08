import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const pdfText = await request.text();
  const stream = await openai.chat.completions.create({
    model: 'o1-mini',
    messages: [
      {
        role: 'user',
        content: 'I would like to organize the contents of this PDF in detail into a blog. Please output it in Markdown format. And please translate it into Korean.',
      },
      {
        role: 'user',
        content: pdfText,
      },
    ],
    store: false,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''; // 🎯 특정 필드만 추출
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });
  return new NextResponse(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
