document.addEventListener("DOMContentLoaded", () => {
    // 1. Remove "not-loaded" and add "loaded" class to trigger main CSS transitions
    let signalIntervalID;
    function resetSignalInterval() {
        if (signalIntervalID) clearInterval(signalIntervalID);
        signalIntervalID = setInterval(triggerSignalNetwork, 5000);
    }

    const loadTimeout = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        document.body.classList.add("loaded");
        clearTimeout(loadTimeout);
        
        // Trigger electrical branching signals immediately on load
        triggerSignalNetwork();
        resetSignalInterval();
    }, 1000);

    // 2. Generate background stars
    const starField = document.getElementById("starField");
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";
        
        const size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 70}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        starField.appendChild(star);
    }

    // Helper to spawn a floating pollen particle
    function spawnPollen(startX, startY, isBurst = false) {
        // Performance guard: prevent DOM overloading from rapid click storms
        if (document.getElementsByClassName("pollen").length > 70) return;

        const p = document.createElement("div");
        p.className = "pollen";
        p.innerText = "❤"; // Unicode Heart
        document.body.appendChild(p);

        // Hearts look better when slightly larger than standard pixel dots
        const size = isBurst ? (Math.random() * 8 + 6) : (Math.random() * 12 + 8); // 6-14px for burst, 8-20px for ambient
        p.style.fontSize = `${size}px`;
        p.style.left = `${startX}px`;
        p.style.top = `${startY}px`;

        // Multi-colored powder/pollen that complements the gold/cyan/rose art theme
        const colors = [
            { bg: "rgb(255, 200, 80)", glow: "rgba(255, 170, 50, 0.7)" },   // Gold
            { bg: "rgb(255, 135, 180)", glow: "rgba(255, 80, 150, 0.7)" },   // Rose Pink
            { bg: "rgb(80, 240, 255)", glow: "rgba(30, 200, 255, 0.7)" },    // Cyan/Teal
            { bg: "rgb(255, 140, 90)", glow: "rgba(255, 90, 40, 0.7)" },     // Warm Coral
            { bg: "rgb(255, 255, 255)", glow: "rgba(255, 255, 255, 0.7)" }   // Sparkle White
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.color = color.bg;
        p.style.textShadow = `0 0 6px ${color.bg}, 0 0 12px ${color.glow}`;

        // Physics variables
        const duration = isBurst ? (Math.random() * 2000 + 1500) : (Math.random() * 8000 + 6000);
        const driftX = isBurst 
            ? (Math.random() - 0.5) * 300 
            : (Math.random() - 0.5) * 150;
        const driftY = isBurst
            ? -(Math.random() * 400 + 200) 
            : -(Math.random() * 600 + 300);

        // Animate using Web Animations API
        p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0 },
            { opacity: 0.9, offset: 0.15 },
            { opacity: 0.9, offset: 0.75 },
            { transform: `translate(${driftX}px, ${driftY}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration,
            easing: isBurst ? 'cubic-bezier(0.25, 1, 0.5, 1)' : 'ease-in-out'
        }).onfinish = () => p.remove();
    }

    // Helper to spawn a signaling pulse node along a path
    function runSignalPulse(path, delay, colorObj) {
        setTimeout(() => {
            // Performance guard: prevent DOM overloading from rapid click storms
            if (document.getElementsByClassName("signal-pulse").length > 50) return;

            const p = document.createElement("div");
            p.className = "signal-pulse";
            p.innerText = "❤"; // Glowing heart node!
            
            if (colorObj) {
                p.style.color = colorObj.bg;
                p.style.textShadow = `0 0 12px ${colorObj.bg}, 0 0 24px ${colorObj.bg}, 0 0 40px ${colorObj.glow}, 0 0 60px ${colorObj.glow}`;
            }
            
            document.body.appendChild(p);

            const container = document.querySelector(".lotus-container");
            if (!container) return;

            const rect = container.getBoundingClientRect();
            
            // Map percentages relative to the lotus-container boundary
            const keyframes = path.map((pt, index) => {
                const x = rect.left + rect.width * (pt.x / 100);
                const y = rect.top + rect.height * (pt.y / 100);
                
                let opacity = 1;
                if (index === 0) opacity = 0;
                if (index === path.length - 1) opacity = 0;
                
                return {
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity: opacity
                };
            });

            p.animate(keyframes, {
                duration: path.length * 350, // 350ms per node step
                easing: "ease-in-out",
                fill: "forwards"
            }).onfinish = () => p.remove();
        }, delay);
    }

    // Define the color themes for repeating signal waves
    const themes = [
        // Theme 1: Gold, Cyan, Rose Pink
        {
            primary: { bg: "rgb(255, 200, 80)", glow: "rgba(255, 170, 50, 0.8)" },
            secondary: { bg: "rgb(80, 240, 255)", glow: "rgba(30, 200, 255, 0.8)" },
            accent: { bg: "rgb(255, 135, 180)", glow: "rgba(255, 80, 150, 0.8)" }
        },
        // Theme 2: Rose, Purple/White, Coral
        {
            primary: { bg: "rgb(255, 135, 180)", glow: "rgba(255, 80, 150, 0.8)" },
            secondary: { bg: "rgb(230, 210, 255)", glow: "rgba(180, 140, 255, 0.8)" },
            accent: { bg: "rgb(255, 140, 90)", glow: "rgba(255, 90, 40, 0.8)" }
        },
        // Theme 3: Cyan, Emerald, Gold
        {
            primary: { bg: "rgb(80, 240, 255)", glow: "rgba(30, 200, 255, 0.8)" },
            secondary: { bg: "rgb(100, 255, 180)", glow: "rgba(50, 220, 130, 0.8)" },
            accent: { bg: "rgb(255, 200, 80)", glow: "rgba(255, 170, 50, 0.8)" }
        },
        // Theme 4: Coral, Gold, White
        {
            primary: { bg: "rgb(255, 140, 90)", glow: "rgba(255, 90, 40, 0.8)" },
            secondary: { bg: "rgb(255, 200, 80)", glow: "rgba(255, 170, 50, 0.8)" },
            accent: { bg: "rgb(255, 255, 255)", glow: "rgba(255, 255, 255, 0.8)" }
        },
        // Theme 5: Lavender, Violet, Cyan
        {
            primary: { bg: "rgb(200, 150, 255)", glow: "rgba(160, 100, 255, 0.8)" },
            secondary: { bg: "rgb(120, 100, 255)", glow: "rgba(80, 50, 255, 0.8)" },
            accent: { bg: "rgb(80, 240, 255)", glow: "rgba(30, 200, 255, 0.8)" }
        }
    ];

    let currentThemeIndex = 0;

    // Define and trigger the sequential signaling network
    function triggerSignalNetwork() {
        // Retrieve colors from the current theme and cycle to the next
        const currentTheme = themes[currentThemeIndex];
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;

        const primaryColor = currentTheme.primary;
        const secondaryColor = currentTheme.secondary;
        const accentColor = currentTheme.accent;
        
        // Coordinates relative to the lotus bounding box
        const centerStem = [
            {x: 50, y: 95}, {x: 50, y: 80}, {x: 50, y: 65}, {x: 50, y: 48}
        ];
        const lowerLeft = [
            {x: 50, y: 95}, {x: 50, y: 85}, {x: 45, y: 78}, {x: 35, y: 72}, {x: 25, y: 75}, {x: 10, y: 50}, {x: 0, y: 25}, {x: -10, y: 0}
        ];
        const lowerRight = [
            {x: 50, y: 95}, {x: 50, y: 85}, {x: 55, y: 78}, {x: 65, y: 72}, {x: 75, y: 75}, {x: 90, y: 50}, {x: 100, y: 25}, {x: 110, y: 0}
        ];
        const middleLeft = [
            {x: 50, y: 95}, {x: 50, y: 70}, {x: 42, y: 62}, {x: 30, y: 55}, {x: 18, y: 57}, {x: 5, y: 35}, {x: -8, y: 12}
        ];
        const middleRight = [
            {x: 50, y: 95}, {x: 50, y: 70}, {x: 58, y: 62}, {x: 70, y: 55}, {x: 82, y: 57}, {x: 95, y: 35}, {x: 108, y: 12}
        ];
        const petalLeft = [
            {x: 50, y: 48}, {x: 42, y: 38}, {x: 35, y: 28}, {x: 32, y: 18}, {x: 25, y: -10}, {x: 15, y: -45}
        ];
        const petalRight = [
            {x: 50, y: 48}, {x: 58, y: 38}, {x: 65, y: 28}, {x: 68, y: 18}, {x: 75, y: -10}, {x: 85, y: -45}
        ];
        const petalCenter = [
            {x: 50, y: 48}, {x: 50, y: 35}, {x: 50, y: 20}, {x: 50, y: 7}, {x: 50, y: -30}, {x: 50, y: -75}
        ];

        // Run signals sequentially:
        // 1. Center stem signal runs immediately
        runSignalPulse(centerStem, 0, primaryColor);
        runSignalPulse(centerStem, 350, secondaryColor); 
        
        // 2. Lower branches fire
        runSignalPulse(lowerLeft, 800, primaryColor);
        runSignalPulse(lowerRight, 800, primaryColor);
        
        // 3. Middle branches fire
        runSignalPulse(middleLeft, 1600, secondaryColor);
        runSignalPulse(middleRight, 1600, secondaryColor);
        
        // 4. Petals branch signals fire as the flower blooms
        runSignalPulse(petalLeft, 2600, accentColor);
        runSignalPulse(petalRight, 2600, accentColor);
        runSignalPulse(petalCenter, 3000, primaryColor);
        runSignalPulse(petalCenter, 3600, secondaryColor);
    }

    // 3. Automatically spawn ambient pollen rising from bottom
    setInterval(() => {
        if (document.body.classList.contains("loaded")) {
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight - (Math.random() * 100 + 50);
            spawnPollen(startX, startY, false);
        }
    }, 400);

    // Create Web Audio Context (lazily initialized on first interaction due to browser policies)
    let audioCtx;
    // Melody frequencies for Yiruma's "River Flows in You" (instantly recognizable, peaceful piano melody)
    const melodyFrequencies = [
        739.99, // F#5
        659.25, // E5
        739.99, // F#5
        659.25, // E5
        739.99, // F#5
        440.00, // A4
        554.37, // C#5
        329.63, // E4
        369.99, // F#4
        293.66, // D4
        369.99, // F#4
        440.00, // A4
        587.33, // D5
        554.37, // C#5
        493.88, // B4
        440.00, // A4
        415.30, // G#4
        440.00, // A4
        493.88, // B4
        329.63  // E4
    ];
    let noteIndex = 0;

    // Synthesizes a simple, pure, and soothing meditation bell chime playing the song melody
    function playSimpleBell() {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Resume context if suspended (common in mobile browsers)
            if (audioCtx.state === "suspended") {
                audioCtx.resume();
            }

            const now = audioCtx.currentTime;
            const freq = melodyFrequencies[noteIndex];
            noteIndex = (noteIndex + 1) % melodyFrequencies.length;

            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            // Soothing sine wave for a pure, clean tone
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now);
            
            // Gain envelope: smooth instant attack (10ms) to avoid click, clean exponential decay (1.2s)
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.25, now + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start(now);
            osc.stop(now + 1.25);
        } catch (e) {
            console.warn("Web Audio API not supported or blocked: ", e);
        }
    }

    let lastHeavyTriggerTime = 0;

    // 4. Interactive Click/Tap Particles, Sound & Vibration
    window.addEventListener("pointerdown", (e) => {
        if (!document.body.classList.contains("loaded")) return;

        // A. Immediate haptic & audio feedback (always triggers for responsiveness)
        if (navigator.vibrate) {
            navigator.vibrate([35, 50, 35]);
        }
        playSimpleBell();

        const now = Date.now();
        const clickX = e.clientX;
        const clickY = e.clientY;

        // B. Spawn a light cluster of sparkles at tap position (always, unless max particle limit is reached)
        const clickSparkles = 5; // Reduced from 8 to save performance
        for (let i = 0; i < clickSparkles; i++) {
            spawnPollen(clickX, clickY, true);
        }

        // C. Throttle heavy animations (branch signal waves & flower fountain) to once per 800ms
        if (now - lastHeavyTriggerTime > 800) {
            lastHeavyTriggerTime = now;

            // Spawn flower fountain sparkles
            const lotus = document.querySelector(".lotus-img");
            if (lotus) {
                const rect = lotus.getBoundingClientRect();
                const flowerX = rect.left + rect.width / 2;
                const flowerY = rect.top + rect.height * 0.22; // centered at core (~22% height of full container)

                const flowerSparkles = 10; // Reduced from 15 to save performance
                for (let i = 0; i < flowerSparkles; i++) {
                    const offsetStartX = flowerX + (Math.random() - 0.5) * 30;
                    const offsetStartY = flowerY + (Math.random() - 0.5) * 30;
                    
                    setTimeout(() => {
                        spawnPollen(offsetStartX, offsetStartY, true);
                    }, i * 40);
                }
            }

            // Trigger fresh branch electrical signal wave and reset the auto loop timer
            triggerSignalNetwork();
            resetSignalInterval();
        }
    });
});
