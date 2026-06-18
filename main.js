document.addEventListener("DOMContentLoaded", () => {
    // 1. Remove "not-loaded" and add "loaded" class to trigger main CSS transitions
    const loadTimeout = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        document.body.classList.add("loaded");
        clearTimeout(loadTimeout);
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
        star.style.top = `${Math.random() * 70}%`; // Keep stars in top 70% of sky
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`; // 2s to 5s twinkling
        
        starField.appendChild(star);
    }

    // Helper to spawn a floating pollen particle
    function spawnPollen(startX, startY, isBurst = false) {
        const p = document.createElement("div");
        p.className = "pollen";
        document.body.appendChild(p);

        const size = isBurst ? (Math.random() * 3 + 1) : (Math.random() * 4 + 2); // 1-4px for burst, 2-6px for ambient
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
            ? (Math.random() - 0.5) * 300 // wider horizontal disperse on click
            : (Math.random() - 0.5) * 150;
        const driftY = isBurst
            ? -(Math.random() * 400 + 200) // shoot upwards
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

    // 3. Automatically spawn ambient pollen rising from bottom
    setInterval(() => {
        // Only spawn if page has loaded
        if (document.body.classList.contains("loaded")) {
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight - (Math.random() * 100 + 50); // Start within the grass
            spawnPollen(startX, startY, false);
        }
    }, 400);

    // 4. Interactive Click Particles
    window.addEventListener("click", (e) => {
        // Only trigger clicks once loaded
        if (!document.body.classList.contains("loaded")) return;

        // A. Spawn sparkles directly at click position
        const clickX = e.clientX;
        const clickY = e.clientY;
        const clickSparkles = 8;
        for (let i = 0; i < clickSparkles; i++) {
            spawnPollen(clickX, clickY, true);
        }

        // B. Spawn a massive fountain of particles from the center of the lotus flower
        const lotus = document.querySelector(".lotus-flower-wrapper");
        if (lotus) {
            const rect = lotus.getBoundingClientRect();
            const flowerX = rect.left + rect.width / 2;
            const flowerY = rect.top + rect.height / 3; // center/top area of the head

            const flowerSparkles = 15;
            for (let i = 0; i < flowerSparkles; i++) {
                // Introduce slight random offset to start positions
                const offsetStartX = flowerX + (Math.random() - 0.5) * 30;
                const offsetStartY = flowerY + (Math.random() - 0.5) * 30;
                
                // Delay each particle slightly for a fluid streaming fountain effect
                setTimeout(() => {
                    spawnPollen(offsetStartX, offsetStartY, true);
                }, i * 40);
            }
        }
    });
});
