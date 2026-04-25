# Karuna AI (करुणा AI)

A voice-first AI companion designed to sit with you in your problems, not just solve them. Built on Karuna (Compassion)—the strength to stay present with suffering and uncertainty without looking away.

**Designed for deep, compassionate listening.**

## Live Demo

[karuna-ai.example.com](https://karuna-ai.example.com)

## What It Is

Karuna AI is a presence. When you speak, Karuna listens. It reflects back the quiet truths underneath your words. It doesn't offer quick fixes or unsolicited advice. It offers "Daya" (Compassion)—the rare experience of being truly heard.

The interface is a breathing saffron orb on a black screen with a generative star background. No chat UI. No distractions. Audio-reactive—pulses warmly when Karuna speaks, shifts to soft blue when you speak, and goes still in shared silence.

Built on Gemini 2.5 Flash Native Audio, Karuna is bilingual, speaking both Hindi and English naturally, moving between them as you do.

## Philosophy: Karuna (Daya)

Inspired by the ancient concept of *Karuna* (Compassion). Unlike pity, Karuna is the active choice to stay present with another's pain. It is the "sitting in the fire" together. 

## Features

- **Emotional Resonance UI**: Orb shifts color based on user sentiment (Saffron, Violet, Soft Green, Soft Pink).
- **Rhythmic Breathing**: Pulse rate dynamically syncs with the user's speech amplitude.
- **Vardaan (Blessing)**: Generative poetic reflections in Hindi.
- **Constellation Memory**: Star systems appear in the background, representing past sessions.
- **Dhvani (Soundscapes)**: Generative ambient drone (Tibetan bowls style) via Web Audio API.
- **Glassmorphic Settings**: Hidden UI for adjusting Presence and Sound controls.
- **Cultural Wisdom**: Integrates teachings from Kabir, Rumi, and Sufi philosophy.
- **Multi-Dialect Support**: Recognises and responds compassionately to various Hindi dialects.
- **Presence Ledger**: Tracks "Shared Moments" rather than just transcripts.
- **Session Aura**: Persistent visual emotional feedback on the interface.

## Architecture

Please see `docs/architecture.md` for a complete system diagram.

**Backend:** FastAPI server on Cloud Run handles WebSocket connections. The Google ADK manages bidirectional audio streaming with the Gemini model. Four Firestore tools handle the user's "Dark Passage" — a constellation of saved uncertainties and reflections.

**Model:** Gemini 2.5 Flash Native Audio via the Vertex AI Live API. Native audio means the model hears tone, pace, and hesitation — not just transcribed words. This enables affective dialogue: Karuna slows down when you sound anxious, stays steady when you're angry, comes closer when you're numb.

**Frontend:** Vanilla JavaScript and Three.js render a breathing orb on a black screen.

## Tech Stack

- **Backend:** Python 3.11, FastAPI, Google ADK, google-genai, google-cloud-firestore
- **Model:** Gemini 2.5 Flash Native Audio (Vertex AI Live API)
- **Frontend:** Vanilla JS, Three.js (r128), Web Audio API
- **Storage:** Google Cloud Firestore (karuna-ai project)
- **Deployment:** Docker → Artifact Registry → Google Cloud Run
- **Streaming:** WebSocket bidirectional audio (ADK bidi-streaming)

## Local Development

1. Clone the repo:
```bash
git clone https://github.com/karuna-ai/karuna-ai.git
cd karuna-ai
```

2. Set up Python 3.11 environment:
```bash
python3.11 -m venv .venv
source .venv/bin/activate
```

3. Copy the example environment file and fill in your values:
```bash
cp .env.example backend/app/.env
```

Required variables:
```
GOOGLE_CLOUD_PROJECT=karuna-ai
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_GENAI_USE_VERTEXAI=TRUE
KARUNA_VOICE_NAME=Achird
```

4. Install dependencies:
```bash
cd backend/app
pip install -e .
```

5. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

6. Open [http://localhost:8000](http://localhost:8000) in your browser.

## Running the Calibration Pipeline

After having conversations with Karuna, process the accumulated transcripts:

```bash
cd backend/app
export GOOGLE_CLOUD_PROJECT=karuna-ai
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_VERTEXAI=TRUE
python3 -m agents.handshake
```

This runs the full pipeline: anonymisation → scoring → consolidation → baseline → orchestrator → policy gate.

## Project Structure

```
karuna-ai/
├── backend/app/
│   ├── karuna_agent/
│   │   ├── __init__.py
│   │   └── agent.py              # Voice agent definition + system prompt
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── passage_tools.py      # Firestore tools (save/retrieve/resolve uncertainties)
│   │   └── blessing_tools.py     # Vardaan tool for generative reflections
│   ├── agents/                   # Calibration pipeline agents
│   ├── static/
│   │   ├── css/style.css
│   │   ├── js/
│   │   │   ├── app.js            # WebSocket + state machine
│   │   │   ├── karuna-orb.js     # Three.js breathing orb
│   │   │   ├── ambient.js        # Dhvani soundscape
│   │   │   ├── audio-player.js
│   │   │   └── audio-recorder.js
│   │   └── index.html
│   ├── main.py                   # FastAPI + WebSocket handler
│   └── pyproject.toml
├── knowledge-base/               # Root knowledge base mirroring
├── docs/                         # Architecture diagrams and mockups
├── deploy.sh
├── Dockerfile
├── .env.example
└── README.md
```

## Knowledge Base

The `knowledge-base/` directory contains reference documents:

- **kb-01-karuna-philosophy.txt:** Karuna's philosophical framework.
- **kb-02-karuna-patterns.txt:** Conversation patterns and emotional matching.
- **kb-03-karuna-antipatterns.txt:** User anti-patterns and reframe directions.
- **kb-04-boundaries-and-safety.txt:** Boundaries, crisis protocol, character integrity.
- **kb-05-cultural-wisdom.txt:** Deep cultural context (Kabir, Sufi, Metta).

## Tools

Firestore-backed tools power the agent's memory:

- **save_to_passage** — silently saves a user's core uncertainty.
- **get_passage_history** — retrieves recent uncertainties.
- **resolve_uncertainty** — marks an uncertainty as resolved.
- **crisis_resources** — provides localised crisis support information.
- **generate_vardaan** — generates a poetic blessing/reflection.

## Governed Calibration Pipeline

Processing conversations through two data paths:

**Path 1:** User Memory — full transcript with PII retained, per-user isolation. Karuna remembers who you are across sessions.

**Path 2:** Anonymised Learning — five-stage anonymisation, adversarial audit, emotional weight annotation. Scored across six attunement dimensions. Cross-conversation pattern detection generates calibration hypotheses filtered by a deterministic policy gate.

## License

MIT
