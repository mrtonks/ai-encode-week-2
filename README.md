# AI Encode Course - Week 2 weekend project

This project shows what was learned during the AI Bootcamp Week 2.

The goal of this project is to create an AI that will tell jokes. To achieve this, we instruct the model using different prompts. Moreover, the project allows the user to select different parameters that will add more information to the model and will its answers.

The user can select a topic, tone, and kind of joke from different lists. Also, they can decrease or increase how random the answer will be (more randomness will get a non-sensical answer).

This project makes use of the library for OpenAI using a model that will be run locally through [Text generation UI](https://github.com/oobabooga/text-generation-webui).

## Getting Started

### Prerequisites

Obtain an OpenAI key and run the following command

```
export OPENAI_API_KEY=<your_key>
```

### How to start

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Models used and observations

- `capybarahermes-2.5-mistral-7b.Q3_K_L.gguf` and `dolphin-2.2.1-mistral-7b.Q4_K_M.gguf` load quite fast and generate text quite fast. `dolphin-2.2.1` is slightly faster but `capybarahermes-2.5` provides a slightly better evaluation text.
- `TheBloke_CapybaraHermes-2.5-Mistral-7B-AWQ` loads a bit slower and takes a bit more time to generate text but provides the best evaluation format.
- `microsoft_Phi-3-mini-128k-instruct` loads significantly slower and generates text in a quite slow pace. It also seems to analyze the joke when writing it so I assume it requires a slightly different context restrictions. Also seems to generate multiple jokes instead of stopping.

In conclusion, `capybarahermes-2.5-mistral-7b.Q3_K_L.gguf` and `dolphin-2.2.1-mistral-7b.Q4_K_M.gguf` were our selected models when running this project.

## Group 8 members

- 2vJSPK - Jesus Vera
- 4bwGEs - Aleksandar Brayanov