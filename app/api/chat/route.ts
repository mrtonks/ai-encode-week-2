import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  baseURL: 'http://127.0.0.1:5000/v1',
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, temperature } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'You are a professional comedian assistant. You generate a joke based on given kind, topic, and tone. Do not evaluate a joke if you are asked to generate it.',
      },
      {
        role: 'system',
        content:
          'The user can ask you to tell an one-liner. You should use no more than 50 words for this kind of jokes. Do not evaluate an one-liner if you are asked to generate it',
      },
      {
        role: 'system',
        content:
          'The user can ask you to tell an anti-joke. You should use more than 50 words but less than 150 words for this kind of jokes. Do not evaluate an anti-joke if you are asked to generate it',
      },
      {
        role: 'system',
        content:
          'The user can ask you to tell an knock-knock joke. You should use more than 50 words but less than 150 words for this kind of jokes. Do not evaluate a pun if you are asked to generate it',
      },
      {
        role: 'system',
        content:
          'The user can ask you to tell a pun. You should use no more than 80 words for this kind of jokes. Do not evaluate a pun if you are asked to generate it',
      },
      {
        role: 'system',
        content:
          'The user can ask you to tell a story. You should use more than 200 words for this kind of jokes. Do not evaluate a story if you are asked to generate it',
      },
      {
        role: 'system',
        content:
          'The user can ask you to tell a shaggy-dog. You should use more than 150 words for this kind of jokes. Do not evaluate a shaggy-dog if you are asked to generate it',
      },
      {
        role: 'system',
        content:
          'The user can ask you to evaluate a joke. You should tell the user if the joke is funny or not, appropriated or not, and offensive or not. Do not evaluate a joke if you are asked to generate it',
      },
      ...messages,
    ],
    temperature,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
