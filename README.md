LiChat is an open-source, AI-first chat playground for experimenting with multimodal AI, agentic workflows, memory, and research tools. Built to learn how modern AI systems actually work under the hood.

Not a "ChatGPT wrapper".

Website: https://lichat.app (not live yet)

License: MIT

Model: Gemini (via AI SDK + SI Gateway)

## What is LiChat?

LiChat is a developer-focused AI chat platform that supports:

- Text, image, and audio input/output

- Tool-calling and deep research workflows

- Short-term and long-term memory

- Streaming responses

- Cost-aware, production-grade AI integration

## Bring-Your-Own-API-Key (BYOK)

It’s designed as a learning playground to explore how AI-native products like ChatGPT, Perplexity, and Cursor are built — without “vibe coding”.

## Goals

- Learn agentic AI systems by building them from scratch

- Build real, open-source AI products, not demos

- Keep everything modular, inspectable, and deterministic

- Optimize for clarity, reliability, and cost awareness

## Core Features

### Chat

- Streaming AI responses

- Session-based conversations (anonymous by default)

### System prompt editor

- Model & parameter controls

### Multimodal

- Image input (vision models)

- Audio input (speech-to-text)

- Optional audio output (text-to-speech)

- Cloudflare R2 for file storage

### Memory

- Short-term memory: sliding window context

- Long-term memory: extracted facts stored per session

- Memory inspection & deletion

### Research Mode

- Web search tool

- Source-grounded answers

- Citation display

- Step-by-step reasoning (non-autonomous)

### Agentic Workflows (Controlled)

- Planner → tool → observe → decide loop

- Tool execution logs

- Guardrails (timeouts, step limits)

### Observability

- Token usage & cost tracking

- Tool call traces

- Error handling & retries

## Tech Stack

### Frontend

- Next.js

- React

- TanStack Query

- Tailwind CSS

### Backend

- Elysia (TypeScript)

- AI SDK

- Vercel AI Gateway

- Gemini models

### Infrastructure

- PostgreSQL — sessions, messages, memory

- Cloudflare R2 — file storage (images/audio)

- Docker — local & production setup

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/yourusername/lichat.git
cd lichat
```

2. Setup environment variables
```bash
cp .env.example .env
```

Required:

- DATABASE_URL
- R2_BUCKET
- SI_GATEWAY_KEY
- GEMINI_API_KEY (or BYOK via UI)

3. Run locally with Docker
```bash
docker compose up --build
```

Frontend: http://localhost:3000

Backend: http://localhost:4000



### What This Project Demonstrates

If you’re reviewing this project as a hiring manager, LiChat shows:

- AI system design & orchestration

- Multimodal model integration

- Tool calling & agent control

- Memory systems (short + long term)

- Streaming & real-time UX

- Production-grade backend architecture

- Cost-aware AI usage

- Open-source engineering practices


### Contributing

Not Accepting Contributions

### License

MIT License © 2025
Free to use, modify, and self-host.

### Final Note

LiChat is built to learn by doing, not to chase hype.

If you’re interested in:

- AI engineering

- agentic systems

- developer tooling

- open-source AI

You’re in the right place.