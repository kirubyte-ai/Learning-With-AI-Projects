document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('cook-magic-btn');
    const resultContainer = document.getElementById('result-container');
    const inputs = [
        document.getElementById('ingredient1'),
        document.getElementById('ingredient2'),
        document.getElementById('ingredient3')
    ];

    btn.addEventListener('click', handleCookMagic);

    // Support submitting via "Enter" key
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleCookMagic();
            }
        });
    });

    async function handleCookMagic() {
        const ingredients = inputs.map(input => input.value.trim()).filter(Boolean);
        
        if (ingredients.length === 0) {
            showResult('Please enter at least one ingredient to begin the magic!', true);
            return;
        }

        // Add a small bounce effect to the button programmatically
        btn.style.transform = 'scale(0.96)';
        setTimeout(() => btn.style.transform = '', 150);

        // Disable button & update UI
        btn.disabled = true;
        const btnText = btn.querySelector('.btn-text');
        btnText.textContent = 'Cooking...';

        // Reset and show loading state safely
        resultContainer.classList.add('hidden');
        
        // Wait for container to visually hide before showing the spinner
        await new Promise(resolve => setTimeout(resolve, 300));
        
        resultContainer.innerHTML = '<div class="loading-spinner"></div>';
        resultContainer.classList.remove('hidden');
        
        try {
            // Build the prompt
            const ingredientsText = ingredients.join(', ');
            const promptContent = `I have ${ingredientsText}. Create a fancy dish name and a 3-step recipe. 
Return EXACTLY a raw JSON object and nothing else (no markdown formatting, no introduction).
Format: { "dishName": "Name", "steps": ["Step 1", "Step 2", "Step 3"] }`;

            // Call Groq API
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'user',
                            content: promptContent
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const recipeContent = data.choices[0].message.content;

            let formattedRecipe = '';
            try {
                // Extract structured JSON from LLM output
                const jsonMatch = recipeContent.match(/\{[\s\S]*\}/);
                if (!jsonMatch) throw new Error("No JSON object could be parsed from output.");
                const recipeData = JSON.parse(jsonMatch[0]);

                const stepsHtml = recipeData.steps.map((step, index) => `
                    <li class="recipe-step">
                        <span class="step-num">${index + 1}</span>
                        <span class="step-text">${step}</span>
                    </li>
                `).join('');

                formattedRecipe = `
                    <div class="recipe-card">
                        <h3 class="recipe-title">${recipeData.dishName}</h3>
                        <ul class="recipe-steps">
                            ${stepsHtml}
                        </ul>
                    </div>
                `;
            } catch (err) {
                // Fallback to text formatting if JSON breaks
                console.warn("JSON parse fallback. Original:", recipeContent);
                formattedRecipe = `<div class="result-text" style="text-align: left; width: 100%; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">${recipeContent.replace(/\n/g, '<br>')}</div>`;
            }

            showResult(formattedRecipe);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            
            let userMsg = "The kitchen is currently overwhelmed. Please try again!";
            if (error.message.includes('401')) {
                userMsg = "Oops! Your Groq API key appears to be invalid or unauthorized.";
            } else if (error.message.includes('400')) {
                userMsg = "We received a bad request from the kitchen. The model might be decommissioned.";
            } else if (error.message.includes('429')) {
                userMsg = "Whoa there, Chef! You're cooking too fast. Please slow down and try again.";
            } else if (!navigator.onLine) {
                userMsg = "It seems you're offline. Please check your internet connection.";
            }
            
            showResult(
                `<div style="text-align: center; line-height: 1.5;">
                    <strong style="color: #fda4af;">Error:</strong> ${userMsg}
                    <div style="font-size: 0.75em; opacity: 0.5; margin-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.5rem;">
                        ${error.message}
                    </div>
                </div>`
            );
        } finally {
            // Restore button explicitly natively
            btn.disabled = false;
            btn.querySelector('.btn-text').textContent = 'Cook Magic';
        }
    }

    function showResult(htmlContent, isError = false) {
        resultContainer.classList.remove('hidden');
        const colorStyle = isError ? 'style="color: #fda4af;"' : '';
        resultContainer.innerHTML = `<div class="fade-in" ${colorStyle}>${htmlContent}</div>`;
    }

    /* Theme Toggle */
    const themeBtn = document.getElementById('theme-toggle');
    const iconDefault = document.querySelector('.icon-default');
    const iconRomantic = document.querySelector('.icon-romantic');
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('romantic-theme');
        if (document.body.classList.contains('romantic-theme')) {
            iconDefault.style.display = 'none';
            iconRomantic.style.display = 'block';
        } else {
            iconDefault.style.display = 'block';
            iconRomantic.style.display = 'none';
        }
    });

    /* Elegant Particle System Edge Layer */
    function initParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.id = 'particle-container';
        document.body.appendChild(particleContainer);

        const settledQueue = [];
        const maxSettled = 80;

        function createParticle() {
            const isRomantic = document.body.classList.contains('romantic-theme');
            
            const p = document.createElement('div');
            p.classList.add('particle');
            
            // Randomly choose element based on theme
            const isFlower = Math.random() > 0.4;
            const elements = isRomantic 
                ? (isFlower ? ['🌸', '💮', '💖', '💕'] : ['✨', '✧', '🤍']) 
                : (isFlower ? ['🌸', '💮', '🏵️'] : ['✨', '✧', '✦']);
            
            p.textContent = elements[Math.floor(Math.random() * elements.length)];
            
            // Depth & style attributes
            const zIndexDepth = Math.random(); 
            const baseSize = isFlower ? 12 + Math.random() * 14 : 8 + Math.random() * 10;
            const size = isRomantic ? baseSize * 0.85 : baseSize; // slightly smaller in romantic mode
            
            // Blur more in romantic theme for softness
            let blur = zIndexDepth > 0.7 ? 3 : (zIndexDepth < 0.3 ? 0 : 1);
            if(isRomantic) blur += 1.5;
            
            const maxOpacity = isRomantic ? (0.15 + Math.random() * 0.3) : (0.3 + Math.random() * 0.5); // softer opacity
            
            const settleOffset = Math.random() * 40;
            const startX = Math.random() * 100;
            const rot = Math.random() * 360;
            
            // Fall parameters
            const fallDuration = isRomantic ? 15 + Math.random() * 20 : 10 + Math.random() * 15;
            const swayDuration = isRomantic ? 3 + Math.random() * 5 : 2 + Math.random() * 4;
            
            p.style.left = startX + 'vw';
            p.style.fontSize = size + 'px';
            p.style.filter = `blur(${blur}px)${!isFlower ? ' drop-shadow(0 0 6px rgba(255,255,255,0.8))' : ''}`;
            
            p.style.setProperty('--max-opacity', maxOpacity);
            p.style.setProperty('--settle-offset', settleOffset + 'px');
            p.style.setProperty('--rot', rot + 'deg');
            p.style.setProperty('--x-sway', (10 + Math.random() * 15) + 'px');
            
            p.style.animation = `fall ${fallDuration}s linear forwards, sway ${swayDuration}s ease-in-out infinite alternate`;
            
            // Settle event
            p.addEventListener('animationend', (e) => {
                if (e.animationName === 'fall') {
                    p.style.animation = 'none'; // Lock in place horizontally
                    p.style.transform = `translateY(calc(100vh + 50px - ${settleOffset}px)) rotate(${rot}deg)`;
                    p.style.opacity = maxOpacity;
                    
                    settledQueue.push(p);
                    if (settledQueue.length > maxSettled) {
                        const old = settledQueue.shift();
                        old.style.transition = 'opacity 2s ease';
                        old.style.opacity = '0';
                        setTimeout(() => old.remove(), 2000);
                    }
                }
            });

            particleContainer.appendChild(p);
        }

        let generationInterval = setInterval(createParticle, 350);
        
        // Dynamically tune the spawn physics based on theme
        let isRomanticLast = false;
        setInterval(() => {
            const isRomantic = document.body.classList.contains('romantic-theme');
            if (isRomantic !== isRomanticLast) {
               isRomanticLast = isRomantic;
               clearInterval(generationInterval);
               generationInterval = setInterval(createParticle, isRomantic ? 650 : 350);
            }
        }, 500);
        
        // Initial burst
        for(let i=0; i<15; i++) {
             setTimeout(createParticle, Math.random() * 3000);
        }
    }

    initParticles();
});
