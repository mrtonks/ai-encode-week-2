'use client'

import { useChat } from 'ai/react'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const { messages, isLoading, append } = useChat()
  const [topic, setTopic] = useState<string>('comedy')
  const [tone, setTone] = useState<string>('sarcastic')
  const [kind, setKind] = useState<string>('pun')
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<number>(1)

  const handleSetTemperature = (value : number): void => {
    if (isNaN(value) || value < 0 || value > 5) {
      setTemperature(0)
      return
    }

    setTemperature(value)
  }

  const handleGenerateJoke = (): void => {
    
    const intructions = ``
    alert('Joke generated! (not really, but pretend it did)')
  }

  const handleEvaluateJoke = (): void => {
    alert('Joke evaluated! It was not funny.')
  }
  
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <main className="container mx-auto h-screen my-5">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Generate a Joke</h1>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 place-content-center mx-3">
        <div className="md:basis-1/3 basis-full flex flex-col">
          <p className="text-gray-500 text-center mb-3 text-lg md:text-base">
            Fill out the form below to create a custom joke.
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="topic"
                className="block mb-2 text-sm font-medium text-gray-700">
                Topic
              </label>
              <select
                id="topic"
                className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}>
                <option value="comedy">Comedy</option>
                <option value="tragedy">Tragedy</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="fantasy">Fantasy</option>
                <option value="work">Work</option>
                <option value="people">People</option>
                <option value="animals">Animals</option>
                <option value="food">Food</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="tone"
                className="block mb-2 text-sm font-medium text-gray-700">
                Tone
              </label>
              <select
                id="tone"
                className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={tone}
                onChange={(e) => setTone(e.target.value)}>
                <option value="sarcastic">Sarcastic</option>
                <option value="serious">Serious</option>
                <option value="silly">Silly</option>
                <option value="heartwarming">Heartwarming</option>
                <option value="dark">Dark</option>
                <option value="witty">Witty</option>
                <option value="goofy">Goofy</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="kind"
                className="block mb-2 text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="kind"
                className="w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={kind}
                onChange={(e) => setKind(e.target.value)}>
                <option value="pun">Pun</option>
                <option value="one-liner">One-liner</option>
                <option value="knock-knock">Knock-Knock</option>
                <option value="shaggy-dog">Shaggy Dog</option>
                <option value="anti-joke">Anti-Joke</option>
                <option value="story">Story</option>
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="temperature"
                  className="block mb-2 text-sm font-medium text-gray-700">
                  Randomness
                </label>
                <input
                  type="number"
                  value={temperature}
                  min="0"
                  max="5"
                  step="0.01"
                  className="w-20 border-gray-300 rounded-md block p-2 text-right"
                  onChange={(e) => handleSetTemperature(parseFloat(e.target.value))}
                />
              </div>
              <input
                type="range"
                id="temperature"
                min="0"
                max="5"
                step="0.01"
                className="rounded-lg w-full h-2 cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, #000 ${
                    ((temperature - 0) * 100) / (5 - 0)
                  }%, #fff  ${((temperature - 0) * 100) / (5 - 0)}%)`,
                }}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              />
            </div>
            { !isGenerated && (
              <button
                type="button"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={() =>{
                  append( {
                    role: "user",
                    content: `Generate a ${kind} joke about ${topic} in a ${tone} tone.`,
                  });
                  setIsGenerated(true);
                }}>
                Generate Joke
              </button>
            )}
            {!!messages.length && !isLoading && isGenerated && (
              <button type="button" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick= {() => {
                  append( {
                    role: "user",
                    content: `Evaluate the following joke: ${messages[messages.length - 1].content}`,
                  });
                  setIsGenerated(false);
                }}>
                Evaluate Joke
              </button>
            )}
          </form>
        </div>
        <div className="md:basis-2/3 basis-full">
          <div className="flex flex-col w-full h-screen md:max-w-md pb-24 mx-auto stretch">
            <div className="whitespace-pre-wrap bg-slate-700 p-3 my-2 rounded-lg text-white">AI: What kind of joke do you want me to tell you today?</div>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-green-700 p-3 m-2 rounded-lg text-white'
                    : 'bg-slate-700 p-3 m-2 rounded-lg text-white'
                }`}>
                {m.role === 'user' ? 'User: ' : 'AI: '}
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end pr-4">
                <span className="animate-bounce">...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
