# 🌸 The Mystic Bloom

A cinematic, interactive lotus bloom experience built with **HTML, CSS, and JavaScript**.

The page combines animated visuals, glowing signal pulses, ambient particles, starfield effects, haptic interaction, and optional background music to create a mystical night-scene experience.

---

## ✨ Features

- Smooth lotus reveal animation with layered glow effects
- Dynamic starfield generation on load
- Animated signal-wave pulses through lotus paths
- Ambient and click-triggered particle hearts
- Auto-looping interactive effects with performance guards
- Tap/click haptic feedback support (`navigator.vibrate`)
- Music toggle with smooth fade in/out
- Mobile-responsive layout and typography

---

## 🧱 Tech Stack

- **HTML5** for structure
- **CSS3** for animation, layout, glow effects, and responsiveness
- **Vanilla JavaScript** for interactivity and runtime effects

No external build tools or frameworks are required.

---

## 🚀 Getting Started

### Option 1: Open directly
Open `index.html` in your browser.

### Option 2: Run a local server (recommended)
From the repository root:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

---

## 🎮 Interaction Guide

- **First click/tap anywhere:** starts ambient background music (browser autoplay-safe flow)
- **Tap/click screen:** spawns sparkle particles and triggers pulse effects
- **Top-right audio button:** mute/unmute with smooth volume transition

---

## 📁 Project Structure

```text
.
├── index.html          # Main scene markup
├── style.css           # Visual design, animations, responsive rules
├── main.js             # Runtime effects, particles, pulse system, audio logic
├── lotus_full.webp     # Lotus artwork asset
├── night changes.mp3   # Background audio track
└── README.md
```

---

## ⚙️ Customization Tips

- Update color tones and glow intensity via CSS variables in `:root` (`style.css`)
- Change particle behavior and density in `spawnPollen()` (`main.js`)
- Tune pulse timing in `triggerSignalNetwork()` and `runSignalPulse()` (`main.js`)
- Replace the audio by swapping `night changes.mp3` and updating filename in `main.js` if needed

---

## 📄 License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## 👤 Author

Created by **Yasir Arafat**.