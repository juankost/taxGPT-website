import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { ReadableStream } from 'web-streams-polyfill/ponyfill';

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    openai.apiKey = previewToken
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const backendDomain = process.env.BACKEND_DOMAIN;
  const backendApiEndpoint = process.env.BACKEND_API_ENDPOINT;
  const customBackendUrl = `${backendDomain}${backendApiEndpoint}`;  
  const customRequest = new Request(customBackendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages })
  }); 

  let chunks: Array<any> = [];

  // Defining my callback function
  const onCompletion = async (complete_response: string) => {
    const title = json.messages[0].content.substring(0, 100)
    const id = json.id ?? nanoid()
    const createdAt = Date.now()
    const path = `/chat/${id}`
    const payload = {
      id,
      title,
      userId,
      createdAt,
      path,
      messages: [
        ...messages,
        {
          content: complete_response,
          role: 'assistant'
        }
      ]
    }
    await kv.hmset(`chat:${id}`, payload)
    await kv.zadd(`user:chat:${userId}`, {
      score: createdAt,
      member: `chat:${id}`
    })
  }

  // Create a ReadableStream that fetches and streams the API response
  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch(customRequest);
      const reader = response.body!.getReader();
      const read = async () => {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();            
          const completion = chunks.join('');
          onCompletion(completion);
          return;
        }
        controller.enqueue(value);
        chunks.push(decoder.decode(value, { stream: true }));
        await read();
      };
      await read();
    },
  })

  const streamingTextResponse = new StreamingTextResponse(stream, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });

  return streamingTextResponse;
}
