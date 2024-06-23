import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5000/v1/",
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
    
  const { messages } = await req.json();
  //const { temperature } = await req.json();
  //const { type } = await req.json();


  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
        {
            role: 'system',
            content: 'You are a professional comedian assistant. You help people by generating jokes based on the parameters they provide to you.',
        },
        ...messages,
    ],
    //temperature: temperature,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
