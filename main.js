document.addEventListener("DOMContentLoaded", () => {
    // 1. Remove "not-loaded" and add "loaded" class to trigger main CSS transitions
    const loadTimeout = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        document.body.classList.add("loaded");
        clearTimeout(loadTimeout);
        
        // Trigger electrical branching signals on page load
        triggerSignalNetwork();
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
        const p = document.createElement("div");
        p.className = "pollen";
        document.body.appendChild(p);

        const size = isBurst ? (Math.random() * 3 + 1) : (Math.random() * 4 + 2);
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
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
        p.style.backgroundColor = color.bg;
        p.style.boxShadow = `0 0 6px ${color.bg}, 0 0 12px ${color.glow}`;

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
            const p = document.createElement("div");
            p.className = "signal-pulse";
            
            if (colorObj) {
                p.style.backgroundColor = colorObj.bg;
                p.style.boxShadow = `0 0 8px ${colorObj.bg}, 0 0 16px ${colorObj.bg}, 0 0 24px ${colorObj.glow}`;
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

    // Define and trigger the sequential signaling network
    function triggerSignalNetwork() {
        const goldColor = { bg: "rgb(255, 200, 80)", glow: "rgba(255, 170, 50, 0.8)" };
        const cyanColor = { bg: "rgb(80, 240, 255)", glow: "rgba(30, 200, 255, 0.8)" };
        const pinkColor = { bg: "rgb(255, 135, 180)", glow: "rgba(255, 80, 150, 0.8)" };
        
        // Coordinates relative to the lotus bounding box
        const centerStem = [
            {x: 50, y: 95}, {x: 50, y: 80}, {x: 50, y: 65}, {x: 50, y: 48}
        ];
        const lowerLeft = [
            {x: 50, y: 95}, {x: 50, y: 85}, {x: 45, y: 78}, {x: 35, y: 72}, {x: 25, y: 75}
        ];
        const lowerRight = [
            {x: 50, y: 95}, {x: 50, y: 85}, {x: 55, y: 78}, {x: 65, y: 72}, {x: 75, y: 75}
        ];
        const middleLeft = [
            {x: 50, y: 95}, {x: 50, y: 70}, {x: 42, y: 62}, {x: 30, y: 55}, {x: 18, y: 57}
        ];
        const middleRight = [
            {x: 50, y: 95}, {x: 50, y: 70}, {x: 58, y: 62}, {x: 70, y: 55}, {x: 82, y: 57}
        ];
        const petalLeft = [
            {x: 50, y: 48}, {x: 42, y: 38}, {x: 35, y: 28}, {x: 32, y: 18}
        ];
        const petalRight = [
            {x: 50, y: 48}, {x: 58, y: 38}, {x: 65, y: 28}, {x: 68, y: 18}
        ];
        const petalCenter = [
            {x: 50, y: 48}, {x: 50, y: 35}, {x: 50, y: 20}, {x: 50, y: 7}
        ];

        // Run signals sequentially as the circle mask expands:
        // 1. Center stem signal runs immediately
        runSignalPulse(centerStem, 0, goldColor);
        runSignalPulse(centerStem, 350, cyanColor); 
        
        // 2. Lower branches fire as mask expands there
        runSignalPulse(lowerLeft, 800, goldColor);
        runSignalPulse(lowerRight, 800, goldColor);
        
        // 3. Middle branches fire
        runSignalPulse(middleLeft, 1600, cyanColor);
        runSignalPulse(middleRight, 1600, cyanColor);
        
        // 4. Petals branch signals fire as the flower blooms
        runSignalPulse(petalLeft, 2600, pinkColor);
        runSignalPulse(petalRight, 2600, pinkColor);
        runSignalPulse(petalCenter, 3000, goldColor);
        runSignalPulse(petalCenter, 3600, cyanColor);
    }

    // 3. Automatically spawn ambient pollen rising from bottom
    setInterval(() => {
        if (document.body.classList.contains("loaded")) {
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight - (Math.random() * 100 + 50);
            spawnPollen(startX, startY, false);
        }
    }, 400);

    // 4. Interactive Click Particles
    window.addEventListener("click", (e) => {
        if (!document.body.classList.contains("loaded")) return;

        // A. Spawn sparkles directly at click position
        const clickX = e.clientX;
        const clickY = e.clientY;
        const clickSparkles = 8;
        for (let i = 0; i < clickSparkles; i++) {
            spawnPollen(clickX, clickY, true);
        }

        // B. Spawn a massive fountain of particles from the center of the lotus flower
        const lotus = document.querySelector(".lotus-img");
        if (lotus) {
            const rect = lotus.getBoundingClientRect();
            const flowerX = rect.left + rect.width / 2;
            const flowerY = rect.top + rect.height * 0.22; // centered at core (~22% height of full container)

            const flowerSparkles = 15;
            for (let i = 0; i < flowerSparkles; i++) {
                const offsetStartX = flowerX + (Math.random() - 0.5) * 30;
                const offsetStartY = flowerY + (Math.random() - 0.5) * 30;
                
                setTimeout(() => {
                    spawnPollen(offsetStartX, offsetStartY, true);
                }, i * 40);
            }
            
            // Send another electrical pulse up the central petal upon click!
            const petalCenter = [
                {x: 50, y: 48}, {x: 50, y: 35}, {x: 50, y: 20}, {x: 50, y: 7}
            ];
            runSignalPulse(petalCenter, 0, { bg: "rgb(255, 255, 255)", glow: "rgba(255, 255, 255, 0.8)" });
        }
    });
});
