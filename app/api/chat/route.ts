import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';
import { auth } from '@/auth'
import { kv } from '@vercel/kv'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'; // or 'nodejs' which uses Serverless Functions
export const dynamic = 'force-dynamic'; // always run dynamically

export async function POST(request: Request) {

  const json = await request.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id
  const id = json.id ?? nanoid()
  const title = json.messages[0].content.substring(0, 100)

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  // Make request to backend
  const backendDomain = process.env.BACKEND_DOMAIN;
  const backendApiEndpoint = process.env.BACKEND_API_ENDPOINT;
  const customBackendUrl = `${backendDomain}${backendApiEndpoint}`;  
  const res = await fetch(customBackendUrl, {
    headers: {
      'Accept': 'text/event-stream', // Ensure backend understands we expect a stream
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ messages }),
  });


  // Defining my callback function
  const onCompletion = async (complete_response: string) => {
    const createdAt = Date.now()
    const path = `/chat/${id}`
    const data = {
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
    await kv.hmset(`chat:${id}`, data)
    await kv.zadd(`user:chat:${userId}`, {
      score: createdAt,
      member: `chat:${id}`
    })
  }
  
  
  let completeResponse = '';
  const newStream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data;
          // console.log('data', JSON.stringify(data));
          if (data === '[DONE]') {
            controller.close();
            onCompletion(completeResponse);
            return;
          }
          try {
            if (counter < 2 && (data.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
            return;
            }
            const queue = encoder.encode(data);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
        completeResponse += decoder.decode(chunk);
      }
    },
  });

  return new Response(newStream, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream' },
  });
}