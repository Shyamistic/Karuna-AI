<div align="center">
  <img src="https://raw.githubusercontent.com/Shyamistic/Karuna-AI/main/docs/assets/karuna_hero_banner_1777150771109.png" alt="Karuna AI Hero Banner" width="100%" />
  
  # Karuna AI (करुणा AI)
  
  *A voice-first AI companion designed to sit with you in your problems, not just solve them. Built on Karuna (Compassion)—the strength to stay present with suffering and uncertainty without looking away.*
</div>

---

## 🌌 What It Is

Karuna AI is a presence. When you speak, Karuna listens. It reflects back the quiet truths underneath your words. It doesn't offer quick fixes or unsolicited advice. It offers "Daya" (Compassion)—the rare experience of being truly heard.

The interface is a breathing saffron orb on a black screen with a generative star background. No chat UI. No distractions. Audio-reactive—pulses warmly when Karuna speaks, shifts to soft blue when you speak, and goes still in shared silence.

Built on **Gemini 2.0 Flash Multimodal Live API**, Karuna is bilingual, speaking both Hindi and English naturally, moving between them as you do.

<div align="center">
  <img src="https://raw.githubusercontent.com/Shyamistic/Karuna-AI/main/docs/assets/karuna_desktop_ui_1777150860309.png" alt="Karuna Desktop UI" width="80%" />
</div>

## 🪞 Philosophy: The Mirror of Daya

Inspired by the ancient concept of *Karuna* (Compassion). Unlike pity, Karuna is the active choice to stay present with another's pain. It is the "sitting in the fire" together. 

<div align="center">
  <img src="https://raw.githubusercontent.com/Shyamistic/Karuna-AI/main/docs/assets/karuna_mirror_of_daya_1777150807816.png" alt="Mirror of Daya" width="60%" />
</div>

## ✨ Features

- **Emotional Resonance UI**: Orb shifts color based on user sentiment (Saffron, Violet, Soft Green, Soft Pink).
- **Rhythmic Breathing**: Pulse rate dynamically syncs with the user's speech amplitude.
- **Vardaan (Blessing)**: Generative poetic reflections in Hindi.
- **Constellation Memory**: Star systems appear in the background, representing past sessions.
- **Dhvani (Soundscapes)**: Generative ambient drone (Tibetan bowls style) via Web Audio API.
- **Glassmorphic Settings**: Hidden UI for adjusting Presence and Sound controls.
- **Cultural Wisdom**: Integrates teachings from Kabir, Rumi, and Sufi philosophy.

<div align="center">
  <img src="https://raw.githubusercontent.com/Shyamistic/Karuna-AI/main/docs/assets/karuna_live_audio_1777150821797.png" alt="Live Audio Visualization" width="80%" />
</div>

## 🏗 Architecture & Tech Stack

Karuna AI uses a modern, real-time architecture to achieve sub-second conversational latency with emotional awareness.

<div align="center">
  <img src="https://raw.githubusercontent.com/Shyamistic/Karuna-AI/main/docs/assets/karuna_architecture_1777150785296.png" alt="Karuna Architecture" width="100%" />
</div>

- **Backend:** Python 3.11, FastAPI, Google ADK, google-genai, google-cloud-firestore
- **Model:** Gemini 2.0 Flash (Multimodal Live API via WebSockets)
- **Frontend:** Vanilla JS, Three.js (r128), Web Audio API
- **Storage:** Google Cloud Firestore (karuna-ai project)
- **Deployment:** Render (Dockerized Web Service)

## 📱 Cross-Platform Design

Designed to feel native, calming, and premium on both desktop and mobile devices.

<div align="center">
  <img src="https://raw.githubusercontent.com/Shyamistic/Karuna-AI/main/docs/assets/karuna_mobile_ui_1777150845452.png" alt="Mobile UI" width="30%" />
</div>

## 🌌 The Dark Passage (Constellation)

Karuna maintains a persistent memory of your unresolved thoughts and emotions, visualizing them as a constellation of stars in the background.

<div align="center">
  <img src="https://raw.githubusercontent.com/Shyamistic/Karuna-AI/main/docs/assets/karuna_constellation_1777150884410.png" alt="Constellation Memory" width="80%" />
</div>

## 🚀 Local Development

1. Clone the repo & setup environment:
```bash
git clone https://github.com/Shyamistic/Karuna-AI.git
cd Karuna-AI
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:
```bash
cd backend/app
pip install -r requirements.txt
```

3. Set up environment variables (`backend/app/.env`):
```env
GOOGLE_API_KEY=your_gemini_api_key
GOOGLE_GENAI_USE_VERTEXAI=FALSE
KARUNA_VOICE_NAME=Aoede
```

4. Run the server:
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📜 License

MIT License
