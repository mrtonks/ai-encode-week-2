'use client'

import { useChat } from 'ai/react'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const { messages, isLoading, append } = useChat()
  const [temperature, setTemperature] = useState<number>(1)
  const [isGenerated, setIsGenerated] = useState<boolean>(false)

  const [state, setState] = useState({
    kind: 'pun',
    tone: 'sarcastic',
    topic: 'comedy',
  })

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const tones = [
    { emoji: '😏', value: 'sarcastic' },
    { emoji: '😐', value: 'serious' },
    { emoji: '🤪', value: 'silly' },
    { emoji: '🤗', value: 'heartwarming' },
    { emoji: '💀', value: 'dark' },
    { emoji: '🤓', value: 'witty' },
    { emoji: '🙃', value: 'goofy' },
  ]

  const topics = [
    { emoji: '😂', value: 'comedy' },
    { emoji: '😥', value: 'tragedy' },
    { emoji: '💖', value: 'romance' },
    { emoji: '🛸', value: 'sci-fi' },
    { emoji: '🧙‍♂️', value: 'fantasy' },
    { emoji: '💼', value: 'work' },
    { emoji: '👥', value: 'people' },
    { emoji: '🐾', value: 'animals' },
    { emoji: '🍴🍲', value: 'food' },
  ]

  const kinds = [
    { emoji: '🤡', value: 'pun' },
    { emoji: '🙊', value: 'one-liner' },
    { emoji: '🚪', value: 'knock-knock' },
    { emoji: '🐶', value: 'shaggy-dog' },
    { emoji: '🎭', value: 'anti-joke' },
    { emoji: '✍', value: 'story' },
  ]

  const handleSetTemperature = (value: number): void => {
    if (isNaN(value) || value < 0 || value > 5) {
      setTemperature(0)
      return
    }

    setTemperature(value)
  }

  const handleGenerateJoke = (): void => {
    append({
      role: 'user',
      content: `Generate a ${state.kind} joke about ${state.topic} in a ${state.tone} tone.`,
    })
    setIsGenerated(true)
  }

  const handleEvaluateJoke = (): void => {
    append({
      role: 'user',
      content: `Evaluate the following joke: ${
        messages[messages.length - 1].content
      }`,
    })
    setIsGenerated(false)
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
        <div className="md:basis-2/5 basis-full flex flex-col mb-5">
          <p className="text-gray-500 text-center mb-3 text-lg md:text-base">
            Fill out the form below to create a custom joke.
          </p>
          <form className="space-y-4">
            <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold">Topics</h3>

              <div className="flex flex-wrap justify-center">
                {topics.map(({ value, emoji }) => (
                  <div
                    key={value}
                    className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                    <input
                      id={value}
                      type="radio"
                      name="topic"
                      value={value}
                      checked={value === state.topic}
                      onChange={handleChange}
                    />
                    <label className="ml-2" htmlFor={value}>
                      {`${emoji} ${value}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold">Tones</h3>
              <div className="flex flex-wrap justify-center">
                {tones.map(({ value, emoji }) => (
                  <div
                    key={value}
                    className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                    <input
                      id={value}
                      type="radio"
                      name="tone"
                      value={value}
                      checked={value === state.tone}
                      onChange={handleChange}
                    />
                    <label className="ml-2" htmlFor={value}>
                      {`${emoji} ${value}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold">Kinds</h3>

              <div className="flex flex-wrap justify-center">
                {kinds.map(({ value, emoji }) => (
                  <div
                    key={value}
                    className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                    <input
                      id={value}
                      type="radio"
                      name="kind"
                      value={value}
                      checked={value === state.kind}
                      onChange={handleChange}
                    />
                    <label className="ml-2" htmlFor={value}>
                      {`${emoji} ${value}`}
                    </label>
                  </div>
                ))}
              </div>
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
                  onChange={(e) =>
                    handleSetTemperature(parseFloat(e.target.value))
                  }
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
            {!isGenerated && (
              <button
                type="button"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={handleGenerateJoke}>
                Generate Joke
              </button>
            )}
            {!!messages.length && !isLoading && isGenerated && (
              <button
                type="button"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 mb-5"
                onClick={handleEvaluateJoke}>
                Evaluate Joke
              </button>
            )}
          </form>
        </div>
        <div className="md:basis-3/5 basis-full mb-5 overflow-auto" ref={messagesContainerRef}>
          <div className="flex flex-col w-full h-screen md:max-w-md pb-24 mx-auto stretch">
            <div className="whitespace-pre-wrap bg-slate-700 p-3 m-2 rounded-lg text-white">
              AI: What kind of joke do you want me to tell you today?
            </div>
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
