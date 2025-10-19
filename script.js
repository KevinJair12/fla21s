// ===== DECLARATORIA SPECIAL PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== INITIALIZE ALL FUNCTIONS =====
    initScrollAnimations();
    initLoadingScreen();
    initParallaxEffect();
    initTypingEffect();
    
    // Check audio compatibility before initializing
    checkAudioCompatibility();
    initAudioAndLyrics();
    
    console.log('✨ Declaratoria Page Loaded Successfully!');
});

// ===== AUDIO COMPATIBILITY CHECK =====
function checkAudioCompatibility() {
    const audio = document.createElement('audio');
    const canPlayMP3 = audio.canPlayType('audio/mpeg');
    const canPlayMP3Alt = audio.canPlayType('audio/mp3');
    
    console.log('Audio compatibility check:');
    console.log('- MP3 support:', canPlayMP3 || canPlayMP3Alt);
    console.log('- Audio element support:', !!document.createElement('audio').play);
    
    if (!canPlayMP3 && !canPlayMP3Alt) {
        console.warn('MP3 format not supported by this browser');
        updateStatus('Formato de audio no soportado por este navegador', 'error');
    }
    
    // Check if user interaction is required for audio
    const testAudio = new Audio();
    testAudio.muted = true;
    testAudio.volume = 0;
    
    try {
        testAudio.play().then(() => {
            console.log('Audio autoplay supported');
            updateStatus('Listo para comenzar la historia', 'ready');
        }).catch((error) => {
            console.log('Audio autoplay requires user interaction:', error);
            updateStatus('🔊 Haz clic en "Comenzar Historia" para activar el audio', 'info');
        });
    } catch (error) {
        console.log('Audio playback requires user interaction');
        updateStatus('🔊 Haz clic en "Comenzar Historia" para activar el audio', 'info');
    }
}



// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add fade-in class to elements
    document.querySelectorAll('.story-content, .section-title, .hero-buttons').forEach(el => {
        el.classList.add('fade-in');
    });
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Remove loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1500);
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const floatingHearts = document.querySelectorAll('.floating-heart');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
    // Animate floating hearts
    floatingHearts.forEach((heart, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = scrolled * speed;
        heart.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`;
    });
    
    // Animate floating flowers
    const floatingFlowers = document.querySelectorAll('.flower');
    floatingFlowers.forEach((flower, index) => {
        const speed = (index + 1) * 0.05;
        const yPos = scrolled * speed;
        flower.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.05}deg)`;
    });
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .highlight-text');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = function() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}



// ===== PARTICLE SYSTEM =====
function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        };
    }
    
    function updateParticles() {
        particles = particles.filter(particle => {
            particle.y -= particle.speed;
            particle.opacity -= 0.005;
            
            return particle.y > -10 && particle.opacity > 0;
        });
        
        if (Math.random() < 0.3) {
            particles.push(createParticle());
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

// ===== INITIALIZE PARTICLE SYSTEM =====
setTimeout(createParticleSystem, 2000);

// ===== CREATE ADDITIONAL FALLING PETALS =====
function createFallingPetals() {
    const petalsContainer = document.querySelector('.falling-petals');
    if (!petalsContainer) return;
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        
        petalsContainer.appendChild(petal);
        
        // Remove petal after animation completes
        setTimeout(() => {
            if (petal.parentElement) {
                petal.remove();
            }
        }, 15000);
    }
    
    // Create new petals periodically
    setInterval(createPetal, 2000);
    
    // Create initial petals
    for (let i = 0; i < 5; i++) {
        setTimeout(createPetal, i * 500);
    }
}

// ===== INITIALIZE FALLING PETALS =====
setTimeout(createFallingPetals, 3000);

// ===== AUDIO AND LYRICS SYSTEM =====
let audioPlayer;
let audioContext;
let analyser;
let source;
let dataArray;
let currentLyricIndex = 0;
let voiceDetectionThreshold = 0.01;
let isVoiceDetected = false;
let voiceStartTime = 0;
let syncOffset = 0;

let lyricsData = [
    { start: 0, end: 13, text: "Tu risa es un cielo que nunca se apaga" },
    { start: 14, end: 18, text: "Una estrella que brilla aunque nadie la llama" },
    { start: 18, end: 23, text: "Eres viento en mis alas, mi calma en el ruido" },
    { start: 25, end: 30, text: "Quiero ser tu último amor" },
    { start: 29, end: 34, text: "El que cierre el libro y guarde el calor" },
    { start: 34, end: 44, text: "Tu refugio, tu razón El final de tu canción" },
    { start: 54, end: 59, text: "Tus ojos son mares, donde quiero perderme" },
    { start: 59, end: 63, text: "Un abrazo que cura, un hogar donde verme" },
    { start: 63, end: 69, text: "Eres fuego en mi invierno, mi faro encendido" },
    { start: 71, end: 75, text: "Si me dejas, no habrá final" },
    { start: 75, end: 79, text: "Solo historias por contar" },
    { start: 80, end: 84, text: "Quiero ser tu último amor" },
    { start: 85, end: 88, text: "El que cierre el libro y guarde el calor" },
    { start: 89, end: 98, text: "Tu refugio, tu razón El final de tu canción" },
    { start: 99, end: 107, text: "Si me dejas no habrá final, solo historias por contar" },
    { start: 107, end: 110, text: "Quiero ser tu último amor" },
    { start: 111, end: 115, text: "El que cierre el libro y guarde el calor" },
    { start: 116, end: 125, text: "Tu refugio, tu razón, el final de tu canción" },
    { start: 125, end: 129, text: "No prometo el cielo sin nubes" },
    { start: 130, end: 133, text: "Pero sí luchar por lo que tuve" },
    { start: 134, end: 139, text: "Si me eliges, si me tomas" },
    { start: 139, end: 144, text: "Seré tuyo hasta las sombras" }
];

function initAudioAndLyrics() {
    audioPlayer = document.getElementById('audioPlayer');
    const startButton = document.getElementById('startButton');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    // Debug: Log initial state
    console.log('Initializing audio and lyrics system...');
    console.log('Audio player found:', !!audioPlayer);
    console.log('Start button found:', !!startButton);
    console.log('Lyrics data loaded:', lyricsData.length, 'lyrics');
    console.log('First lyric:', lyricsData[0]);
    
    // Check if audio player exists
    if (!audioPlayer) {
        console.error('Audio player element not found!');
        updateStatus('Error: Reproductor de audio no encontrado', 'error');
        return;
    }
    
    // Check if audio file is accessible
    audioPlayer.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        updateStatus('Error al cargar el archivo de audio', 'error');
    });
    
    // Add load event listener
    audioPlayer.addEventListener('loadeddata', function() {
        console.log('Audio file loaded successfully');
        updateStatus('Audio cargado correctamente', 'success');
    });
    
    // Initialize Web Audio API for voice detection (with fallback)
    try {
        initWebAudioAPI();
    } catch (error) {
        console.warn('Web Audio API not available, using fallback mode');
        analyser = null;
        dataArray = null;
    }
    
    // Start button event
    startButton.addEventListener('click', function() {
        // Check if this is an audio permission request
        if (startButton.classList.contains('audio-permission-btn')) {
            handleAudioPermissionClick();
        } else {
            startAudioAndLyrics();
        }
    });
    
    // Control buttons events
    pauseBtn.addEventListener('click', pauseAudio);
    stopBtn.addEventListener('click', stopAudioAndLyrics);
    
    // Audio events - use high precision animation instead of timeupdate
    audioPlayer.addEventListener('play', startPreciseAnimation);
    audioPlayer.addEventListener('pause', stopPreciseAnimation);
    audioPlayer.addEventListener('ended', onAudioEnded);
    
    // Test lyrics display elements
    const currentLineElement = document.getElementById('currentLine');
    const nextLineElement = document.getElementById('nextLine');
    console.log('Current line element found:', !!currentLineElement);
    console.log('Next line element found:', !!nextLineElement);
}

function initWebAudioAPI() {
    try {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create analyser
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        
        // Create source from audio element
        source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // Create data array for frequency analysis
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        console.log('Web Audio API initialized successfully');
        console.log('Buffer length:', bufferLength);
        
    } catch (error) {
        console.error('Error initializing Web Audio API:', error);
        // Fallback: disable audio analysis if Web Audio API fails
        analyser = null;
        dataArray = null;
    }
}

function detectVoice() {
    // Fallback: simple time-based detection if Web Audio API is not available
    if (!analyser || !dataArray) {
        // Use simple time-based detection as fallback
        const currentTime = audioPlayer.currentTime;
        
        // Detect voice based on time (simple fallback)
        if (currentTime > 0.5 && currentTime < 1.5 && !isVoiceDetected) {
            console.log(`Voice detected (fallback) at ${currentTime.toFixed(2)}s`);
            isVoiceDetected = true;
            voiceStartTime = currentTime;
            
            // Auto-adjust sync offset
            if (voiceStartTime > 0 && voiceStartTime < 5) {
                syncOffset = voiceStartTime;
                console.log(`Auto-sync offset set to: ${syncOffset.toFixed(2)}s`);
                updateStatus(`Auto-sync detectado: ${syncOffset.toFixed(2)}s`, 'success');
            }
            return true;
        }
        return false;
    }
    
    // Get frequency data
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    
    // Normalize to 0-1 range
    const normalizedVolume = average / 255;
    
    // Detect voice based on volume threshold
    const voiceDetected = normalizedVolume > voiceDetectionThreshold;
    
    // Log voice detection for debugging
    if (voiceDetected && !isVoiceDetected) {
        console.log(`Voice detected at ${audioPlayer.currentTime.toFixed(2)}s, volume: ${normalizedVolume.toFixed(3)}`);
        isVoiceDetected = true;
        voiceStartTime = audioPlayer.currentTime;
        
        // Auto-adjust sync offset based on when voice actually starts
        if (voiceStartTime > 0 && voiceStartTime < 5) {
            syncOffset = voiceStartTime;
            console.log(`Auto-sync offset set to: ${syncOffset.toFixed(2)}s`);
        }
    } else if (!voiceDetected && isVoiceDetected) {
        isVoiceDetected = false;
    }
    
    return voiceDetected;
}

function startAudioAndLyrics() {
    const startButton = document.getElementById('startButton');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const romanticMessage = document.getElementById('romanticMessage');
    
    // Update button state
    startButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Iniciando...</span>';
    startButton.disabled = true;
    
    // Hide hero content and show romantic message
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.display = 'none';
    }
    romanticMessage.classList.add('show');
    
    // After 6 seconds, hide romantic message and show lyrics
    setTimeout(() => {
        romanticMessage.classList.remove('show');
        setTimeout(() => {
            lyricsContainer.classList.add('show');
            // Habilitar el botón "Continuar Historia" desde el inicio de las letras
            enableContinueButton();
        }, 500);
    }, 6000);
    
    // Resume audio context if suspended (required for some browsers)
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Audio context resumed');
        });
    }
    
    // Start audio after romantic message
    setTimeout(() => {
        // Check if audio is ready
        if (audioPlayer.readyState < 2) {
            console.log('Audio not ready, waiting...');
            updateStatus('Cargando audio...', 'loading');
            
            // Wait for audio to be ready
            const waitForAudio = () => {
                if (audioPlayer.readyState >= 2) {
                    playAudio();
                } else {
                    setTimeout(waitForAudio, 100);
                }
            };
            waitForAudio();
        } else {
            playAudio();
        }
        
        function playAudio() {
            // Try to play audio with user interaction
            const playPromise = audioPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio started successfully');
                    onAudioStarted();
                }).catch(error => {
                    console.error('Error playing audio:', error);
                    handleAudioError(error);
                });
            } else {
                // Fallback for older browsers
                try {
                    audioPlayer.play();
                    onAudioStarted();
                } catch (error) {
                    console.error('Error playing audio (fallback):', error);
                    handleAudioError(error);
                }
            }
        }
        
        function onAudioStarted() {
            // Update button
            startButton.innerHTML = '<i class="fas fa-music"></i> <span>Reproduciendo...</span>';
            startButton.style.display = 'none';
            
            // Show control buttons (only pause, no stop)
            document.getElementById('pauseBtn').style.display = 'inline-block';
            document.getElementById('stopBtn').style.display = 'none';
            
            // Update status
            updateStatus('Reproduciendo...', 'listening');
            
            // Start high precision animation
            startPreciseAnimation();
            
            // Start romantic visual effects
            startRomanticEffects();
            
            // Add skip button after showing lyrics
            setTimeout(() => {
                addSkipButton();
            }, 1000);
            
            // Show first lyric immediately
            setTimeout(() => {
                if (lyricsData.length > 0) {
                    updateCurrentLine(lyricsData[0].text, false);
                    if (lyricsData.length > 1) {
                        updateNextLine(lyricsData[1].text);
                    }
                    console.log('First lyric set:', lyricsData[0].text);
                }
            }, 100);
        }
        
        function handleAudioError(error) {
            console.error('Audio playback failed:', error);
            
            // Show user-friendly error message and button
            if (error.name === 'NotAllowedError') {
                updateStatus('🔊 Haz clic en "Activar Audio" para permitir la reproducción', 'error');
                startButton.innerHTML = '<i class="fas fa-volume-up"></i> <span>Activar Audio</span>';
                startButton.disabled = false;
                startButton.style.display = 'inline-block';
                startButton.classList.add('audio-permission-btn');
            } else if (error.name === 'NotSupportedError') {
                updateStatus('Formato de audio no soportado por este navegador', 'error');
                startButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Formato no soportado</span>';
                startButton.disabled = true;
                startButton.style.display = 'inline-block';
            } else {
                updateStatus('Error de reproducción. Haz clic para reintentar', 'error');
                startButton.innerHTML = '<i class="fas fa-redo"></i> <span>Reintentar</span>';
                startButton.disabled = false;
                startButton.style.display = 'inline-block';
            }
        }
    }, 6500); // Start audio 6.5 seconds after button click
}


// High precision lyrics synchronization using requestAnimationFrame
let animationFrameId;
let lastUpdateTime = 0;

function updateLyricsDisplay() {
    const currentTime = audioPlayer.currentTime;
    
    // Detect voice activity
    detectVoice();
    
    // Apply sync offset to lyrics timing
    const adjustedTime = currentTime - syncOffset;
    
    // Find the current lyric based on start and end times
    let currentLineIndex = -1;
    let nextLineIndex = -1;
    
    for (let i = 0; i < lyricsData.length; i++) {
        const lyric = lyricsData[i];
        
        // Check if we're within the time range of this lyric
        if (adjustedTime >= lyric.start && adjustedTime <= lyric.end) {
            currentLineIndex = i;
            break;
        }
        
        // Find the next lyric to show
        if (adjustedTime < lyric.start && nextLineIndex === -1) {
            nextLineIndex = i;
        }
    }
    
    // Update current line if it changed
    if (currentLineIndex !== currentLyricIndex) {
        currentLyricIndex = currentLineIndex;
        
        if (currentLineIndex >= 0) {
            updateCurrentLine(lyricsData[currentLineIndex].text, false);
            console.log(`Lyric started at ${currentTime.toFixed(2)}s: ${lyricsData[currentLineIndex].text}`);
        } else {
            updateCurrentLine('', false);
        }
    }
    
    // Update next line
    if (nextLineIndex >= 0 && nextLineIndex < lyricsData.length) {
        updateNextLine(lyricsData[nextLineIndex].text);
    } else {
        updateNextLine('');
    }
    
    // Check if lyrics have ended and enable continue button
    if (lyricsData.length > 0) {
        const lastLyric = lyricsData[lyricsData.length - 1];
        if (adjustedTime > lastLyric.end + 2) { // 2 seconds after last lyric ends
            enableContinueButton();
        }
    }
    
    // Debug: Log current time every 5 seconds
    if (Math.floor(currentTime) % 5 === 0 && currentTime > 0 && currentTime !== lastUpdateTime) {
        console.log(`Current time: ${currentTime.toFixed(2)}s, Adjusted time: ${adjustedTime.toFixed(2)}s, Sync offset: ${syncOffset.toFixed(2)}s, Current lyric index: ${currentLineIndex}`);
        lastUpdateTime = Math.floor(currentTime);
    }
}

// High precision animation loop
function animateLyrics() {
    if (audioPlayer && !audioPlayer.paused) {
        updateLyricsDisplay();
    }
    animationFrameId = requestAnimationFrame(animateLyrics);
}

// Start high precision animation
function startPreciseAnimation() {
    if (!animationFrameId) {
        animateLyrics();
    }
}

// Stop high precision animation
function stopPreciseAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function updateCurrentLine(text, isInterim = false) {
    const currentLineElement = document.getElementById('currentLine');
    if (currentLineElement) {
        // Add transition effect
        currentLineElement.style.opacity = '0';
        currentLineElement.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            currentLineElement.textContent = text;
            currentLineElement.style.opacity = isInterim ? '0.7' : '1';
            currentLineElement.style.fontStyle = isInterim ? 'italic' : 'normal';
            currentLineElement.style.transform = 'translateY(0) scale(1)';
            console.log('Updated current line:', text);
        }, 150);
    } else {
        console.error('Current line element not found!');
    }
}

function updateNextLine(text) {
    const nextLineElement = document.getElementById('nextLine');
    if (nextLineElement) {
        // Add transition effect
        nextLineElement.style.opacity = '0';
        nextLineElement.style.transform = 'translateY(20px) scale(0.95)';
        
        setTimeout(() => {
            nextLineElement.textContent = text;
            nextLineElement.style.opacity = text ? '0.8' : '0';
            nextLineElement.style.transform = text ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)';
            console.log('Updated next line:', text);
        }, 100);
    } else {
        console.error('Next line element not found!');
    }
}

function updateStatus(message, type = 'listening') {
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    
    if (statusText) {
        statusText.textContent = message;
        statusText.className = `status-text status-${type}`;
    }
    
    if (statusDot) {
        statusDot.className = 'status-dot';
        if (type === 'error') {
            statusDot.style.background = '#e74c3c';
            statusDot.style.animation = 'audioErrorPulse 2s infinite';
        } else if (type === 'success') {
            statusDot.style.background = '#27ae60';
            statusDot.style.animation = 'audioSuccessPulse 1s ease-out';
        } else if (type === 'info') {
            statusDot.style.background = '#3498db';
            statusDot.style.animation = 'audioLoading 1.5s infinite';
        } else if (type === 'loading') {
            statusDot.style.background = '#f39c12';
            statusDot.style.animation = 'audioLoading 1.5s infinite';
        } else {
            statusDot.style.background = 'var(--accent-color)';
            statusDot.style.animation = 'pulse 1.5s ease-in-out infinite';
        }
    }
    
    console.log(`Status updated: ${message} (${type})`);
}

// ===== AUDIO PERMISSION HANDLER =====
function handleAudioPermissionClick() {
    console.log('Audio permission button clicked');
    updateStatus('🔊 Activando audio...', 'loading');
    
    // Remove permission button class
    const startButton = document.getElementById('startButton');
    startButton.classList.remove('audio-permission-btn');
    
    // Try to play audio immediately
    if (audioPlayer) {
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Audio permission granted, starting story...');
                updateStatus('Audio activado correctamente', 'success');
                
                // Start the story after a short delay
                setTimeout(() => {
                    startAudioAndLyrics();
                }, 1000);
            }).catch(error => {
                console.error('Audio permission still denied:', error);
                updateStatus('❌ Permisos de audio aún denegados. Intenta hacer clic en el ícono de audio en la barra del navegador.', 'error');
                startButton.innerHTML = '<i class="fas fa-volume-up"></i> <span>Activar Audio</span>';
                startButton.classList.add('audio-permission-btn');
            });
        } else {
            // Fallback for older browsers
            try {
                audioPlayer.play();
                updateStatus('Audio activado correctamente', 'success');
                setTimeout(() => {
                    startAudioAndLyrics();
                }, 1000);
            } catch (error) {
                console.error('Audio permission still denied (fallback):', error);
                updateStatus('❌ Permisos de audio aún denegados. Intenta hacer clic en el ícono de audio en la barra del navegador.', 'error');
                startButton.innerHTML = '<i class="fas fa-volume-up"></i> <span>Activar Audio</span>';
                startButton.classList.add('audio-permission-btn');
            }
        }
    } else {
        updateStatus('Error: Reproductor de audio no encontrado', 'error');
    }
}

function pauseAudio() {
    if (!audioPlayer) {
        console.error('Audio player not available');
        return;
    }
    
    if (audioPlayer.paused) {
        // Resume audio
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-pause"></i> Pausar';
                updateStatus('Reproduciendo...', 'listening');
                startPreciseAnimation(); // Start high precision animation
                startRomanticEffects(); // Resume romantic effects
                console.log('Audio resumed successfully');
            }).catch(error => {
                console.error('Error resuming audio:', error);
                updateStatus('Error al reanudar el audio', 'error');
            });
        } else {
            // Fallback for older browsers
            try {
                audioPlayer.play();
                document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-pause"></i> Pausar';
                updateStatus('Reproduciendo...', 'listening');
                startPreciseAnimation();
                startRomanticEffects();
            } catch (error) {
                console.error('Error resuming audio (fallback):', error);
                updateStatus('Error al reanudar el audio', 'error');
            }
        }
    } else {
        // Pause audio
        audioPlayer.pause();
        document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-play"></i> Continuar';
        updateStatus('Pausado', 'paused');
        stopPreciseAnimation(); // Stop high precision animation
        stopRomanticEffects(); // Stop romantic effects
        console.log('Audio paused');
    }
}

function stopAudioAndLyrics() {
    // Stop audio
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    // Stop high precision animation
    stopPreciseAnimation();
    
    // Stop romantic effects
    stopRomanticEffects();
    
    // Reset UI
    const lyricsContainer = document.getElementById('lyricsContainer');
    const startButton = document.getElementById('startButton');
    
    lyricsContainer.classList.remove('show');
    
    startButton.innerHTML = '<i class="fas fa-play"></i> <span>Comenzar Historia</span>';
    startButton.disabled = false;
    startButton.style.display = 'inline-block';
    
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
    
    // Reset lyrics
    currentLyricIndex = 0;
    
    document.getElementById('currentLine').textContent = '';
    document.getElementById('nextLine').textContent = '';
    updateStatus('Listo para comenzar', 'ready');
}

function onAudioEnded() {
    stopAudioAndLyrics();
    updateStatus('Canción terminada', 'success');
    
    // Show transition message for 4 seconds
    setTimeout(() => {
        const finalMessage = document.getElementById('finalMessage');
        if (finalMessage) {
            finalMessage.classList.add('show');
        }
    }, 1000);
    
    // After 4 seconds, hide transition and show first interactive message
    setTimeout(() => {
        const finalMessage = document.getElementById('finalMessage');
        if (finalMessage) {
            finalMessage.classList.remove('show');
        }
        setTimeout(() => {
            showInteractiveMessage1();
        }, 500);
    }, 5000); // 4 seconds + 1 second delay
}

// ===== MANUAL TIMING ADJUSTMENT =====
// Function to manually adjust timing if needed
function adjustLyricsTiming(offsetSeconds) {
    console.log(`Adjusting lyrics timing by ${offsetSeconds} seconds`);
    lyricsData.forEach(lyric => {
        lyric.start += offsetSeconds;
        lyric.end += offsetSeconds;
    });
    console.log('Updated lyrics timing:', lyricsData);
}

// ===== INTERACTIVE MESSAGES =====
// Variables for interactive flow
let currentInteractiveStep = 0;
let userName = '';

function showInteractiveMessage1() {
    const message = document.getElementById('interactiveMessage1');
    if (message) {
        message.classList.add('show');
        currentInteractiveStep = 1;
    }
    
    // Add event listener for name input
    const nameSubmit = document.getElementById('nameSubmit');
    const nameInput = document.getElementById('nameInput');
    
    if (nameSubmit && nameInput) {
        nameSubmit.addEventListener('click', () => {
            userName = nameInput.value.trim();
            if (userName) {
                hideInteractiveMessage1();
                setTimeout(() => showInteractiveMessage2(), 500);
            }
        });
        
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                userName = nameInput.value.trim();
                if (userName) {
                    hideInteractiveMessage1();
                    setTimeout(() => showInteractiveMessage2(), 500);
                }
            }
        });
    }
}

function hideInteractiveMessage1() {
    const message = document.getElementById('interactiveMessage1');
    if (message) {
        message.classList.remove('show');
    }
}

function showInteractiveMessage2() {
    const message = document.getElementById('interactiveMessage2');
    if (message) {
        message.classList.add('show');
        currentInteractiveStep = 2;
    }
    
    // Add event listeners for yes/no buttons
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            hideInteractiveMessage2();
            setTimeout(() => showResponseMessage(true), 500);
        });
    }
    
    if (noBtn) {
        noBtn.addEventListener('click', () => {
            hideInteractiveMessage2();
            setTimeout(() => showResponseMessage(false), 500);
        });
    }
}

function hideInteractiveMessage2() {
    const message = document.getElementById('interactiveMessage2');
    if (message) {
        message.classList.remove('show');
    }
}

function showResponseMessage(userSaidYes) {
    const message = document.getElementById('responseMessage');
    const responseText = document.getElementById('responseText');
    
    if (message && responseText) {
        if (userSaidYes) {
            responseText.textContent = "Te lo diré pero cuando me des una respuesta a la historia.";
        } else {
            responseText.textContent = "JaJa.. Igual te lo diré pero cuando me des una respuesta a la historia que vas a ver.";
        }
        message.classList.add('show');
        
        // Show gratitude message after 3 seconds
        setTimeout(() => {
            hideResponseMessage();
            setTimeout(() => showGratitudeMessage(), 500);
        }, 3000);
    }
}

function hideResponseMessage() {
    const message = document.getElementById('responseMessage');
    if (message) {
        message.classList.remove('show');
    }
}

function showGratitudeMessage() {
    const message = document.getElementById('gratitudeMessage');
    if (message) {
        message.classList.add('show');
        
        // Add event listener for continue button
        const continueBtn = document.getElementById('continueStoryBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                hideGratitudeMessage();
                // Usar la función integrada para mostrar la historia
                showStorySection();
            });
        }
    }
}

function hideGratitudeMessage() {
    const message = document.getElementById('gratitudeMessage');
    if (message) {
        message.classList.remove('show');
    }
}

// ===== SKIP BUTTON =====
function addSkipButton() {
    const lyricsControls = document.querySelector('.lyrics-controls');
    if (lyricsControls) {
        const skipBtn = document.createElement('button');
        skipBtn.className = 'btn btn-outline-light btn-sm';
        skipBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Continuar';
        skipBtn.id = 'skipBtn';
        skipBtn.style.display = 'inline-block';
        skipBtn.disabled = true;
        skipBtn.style.opacity = '0.5';
        skipBtn.style.cursor = 'not-allowed';
        skipBtn.addEventListener('click', skipToInteractive);
        lyricsControls.appendChild(skipBtn);
    }
}

function enableContinueButton() {
    // Habilitar el botón "Continuar Historia" desde el inicio de las letras
    const continueStoryBtn = document.getElementById('continueStoryBtn');
    if (continueStoryBtn) {
        continueStoryBtn.style.display = 'block';
        continueStoryBtn.style.opacity = '1';
        continueStoryBtn.style.cursor = 'pointer';
        continueStoryBtn.disabled = false;
        continueStoryBtn.style.visibility = 'visible';
        console.log('✅ Botón "Continuar Historia" habilitado desde el inicio de las letras');
        console.log('🔍 Estado del botón:', {
            display: continueStoryBtn.style.display,
            opacity: continueStoryBtn.style.opacity,
            disabled: continueStoryBtn.disabled,
            visibility: continueStoryBtn.style.visibility
        });
    } else {
        console.error('❌ Botón "Continuar Historia" NO ENCONTRADO');
    }
}

function skipToInteractive() {
    // Stop audio and effects
    stopAudioAndLyrics();
    stopRomanticEffects();
    
    // Hide lyrics container
    const lyricsContainer = document.getElementById('lyricsContainer');
    if (lyricsContainer) {
        lyricsContainer.classList.remove('show');
    }
    
    // Show transition message
    setTimeout(() => {
        const finalMessage = document.getElementById('finalMessage');
        if (finalMessage) {
            finalMessage.classList.add('show');
        }
    }, 500);
    
    // After 4 seconds, show interactive messages
    setTimeout(() => {
        const finalMessage = document.getElementById('finalMessage');
        if (finalMessage) {
            finalMessage.classList.remove('show');
        }
        setTimeout(() => showInteractiveMessage1(), 500);
    }, 4500);
}


// Keyboard shortcuts for timing adjustment
document.addEventListener('keydown', function(e) {
    // Press 'A' to advance sync offset by 0.5 second
    if (e.key === 'a' || e.key === 'A') {
        syncOffset += 0.5;
        updateStatus(`Sync offset adelantado: ${syncOffset.toFixed(2)}s`, 'success');
    }
    // Press 'D' to delay sync offset by 0.5 second
    if (e.key === 'd' || e.key === 'D') {
        syncOffset -= 0.5;
        updateStatus(`Sync offset retrasado: ${syncOffset.toFixed(2)}s`, 'success');
    }
    // Press 'S' for small adjustments (0.1 seconds)
    if (e.key === 's' || e.key === 'S') {
        syncOffset += 0.1;
        updateStatus(`Sync offset adelantado: ${syncOffset.toFixed(2)}s`, 'success');
    }
    // Press 'F' for small delays (0.1 seconds)
    if (e.key === 'f' || e.key === 'F') {
        syncOffset -= 0.1;
        updateStatus(`Sync offset retrasado: ${syncOffset.toFixed(2)}s`, 'success');
    }
    // Press 'Q' for very small adjustments (0.05 seconds)
    if (e.key === 'q' || e.key === 'Q') {
        syncOffset += 0.05;
        updateStatus(`Sync offset adelantado: ${syncOffset.toFixed(2)}s`, 'success');
    }
    // Press 'E' for very small delays (0.05 seconds)
    if (e.key === 'e' || e.key === 'E') {
        syncOffset -= 0.05;
        updateStatus(`Sync offset retrasado: ${syncOffset.toFixed(2)}s`, 'success');
    }
    // Press 'R' to reset timing
    if (e.key === 'r' || e.key === 'R') {
        location.reload(); // Reload page to reset timing
    }
    // Press 'T' to show current timing info
    if (e.key === 't' || e.key === 'T') {
        const currentTime = audioPlayer ? audioPlayer.currentTime : 0;
        const adjustedTime = currentTime - syncOffset;
        
        console.log(`Current audio time: ${currentTime.toFixed(2)}s`);
        console.log(`Sync offset: ${syncOffset.toFixed(2)}s`);
        console.log(`Adjusted time: ${adjustedTime.toFixed(2)}s`);
        console.log('Voice detected:', isVoiceDetected);
        
        // Show current and next lyrics
        let currentLyric = null;
        let nextLyric = null;
        
        for (let i = 0; i < lyricsData.length; i++) {
            const lyric = lyricsData[i];
            if (adjustedTime >= lyric.start && adjustedTime <= lyric.end) {
                currentLyric = lyric;
                break;
            }
            if (adjustedTime < lyric.start && !nextLyric) {
                nextLyric = lyric;
            }
        }
        
        if (currentLyric) {
            console.log(`Current lyric: "${currentLyric.text}" (${currentLyric.start}-${currentLyric.end}s)`);
        }
        if (nextLyric) {
            console.log(`Next lyric: "${nextLyric.text}" (${nextLyric.start}-${nextLyric.end}s)`);
        }
        
        updateStatus(`Tiempo: ${currentTime.toFixed(2)}s, Offset: ${syncOffset.toFixed(2)}s`, 'success');
    }
    // Press 'V' to adjust voice detection threshold
    if (e.key === 'v' || e.key === 'V') {
        voiceDetectionThreshold = voiceDetectionThreshold === 0.01 ? 0.005 : 0.01;
        updateStatus(`Threshold: ${voiceDetectionThreshold}`, 'success');
    }
    // Press 'Z' to show help
    if (e.key === 'z' || e.key === 'Z') {
        console.log('Controles de sincronización:');
        console.log('A/D: ±0.5 segundo (sync offset)');
        console.log('S/F: ±0.1 segundos');
        console.log('Q/E: ±0.05 segundos');
        console.log('T: Mostrar tiempo actual');
        console.log('V: Cambiar threshold de voz');
        console.log('R: Reiniciar');
        updateStatus('Controles: A/D(±0.5s), S/F(±0.1s), Q/E(±0.05s), T(info), V(threshold), R(reset)', 'success');
    }
});

// ===== ROMANTIC VISUAL EFFECTS =====
let romanticEffectsActive = false;
let heartInterval;
let sparkleInterval;
let petalInterval;
let lightInterval;

function startRomanticEffects() {
    if (romanticEffectsActive) return;
    romanticEffectsActive = true;
    
    console.log('Starting romantic visual effects...');
    
    // Create floating hearts
    heartInterval = setInterval(createFloatingHeart, 800);
    
    // Create sparkles
    sparkleInterval = setInterval(createSparkle, 600);
    
    // Create falling petals
    petalInterval = setInterval(createFallingPetal, 1200);
    
    // Create light effects
    lightInterval = setInterval(createLightEffect, 2000);
    
    // Create initial burst of effects
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createFloatingHeart(), i * 150);
            setTimeout(() => createSparkle(), i * 100);
            setTimeout(() => createFallingPetal(), i * 200);
        }
    }, 500);
    
    // Create love particles burst
    setTimeout(() => {
        createLoveParticlesBurst();
    }, 1000);
}

function stopRomanticEffects() {
    if (!romanticEffectsActive) return;
    romanticEffectsActive = false;
    
    console.log('Stopping romantic visual effects...');
    
    // Clear all intervals
    if (heartInterval) clearInterval(heartInterval);
    if (sparkleInterval) clearInterval(sparkleInterval);
    if (petalInterval) clearInterval(petalInterval);
    if (lightInterval) clearInterval(lightInterval);
    
    // Remove all effect elements
    document.querySelectorAll('.romantic-heart, .romantic-sparkle, .romantic-petal, .romantic-light').forEach(el => {
        el.remove();
    });
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'romantic-heart';
    heart.innerHTML = '💖';
    
    // Random position
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.position = 'fixed';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.color = getRandomRomanticColor();
    heart.style.zIndex = '1001';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 4s ease-out forwards';
    
    document.body.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => heart.remove(), 4000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'romantic-sparkle';
    sparkle.innerHTML = '✨';
    
    // Random position
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.position = 'fixed';
    sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
    sparkle.style.color = getRandomRomanticColor();
    sparkle.style.zIndex = '1001';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleEffect 2s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => sparkle.remove(), 2000);
}

function createFallingPetal() {
    const petal = document.createElement('div');
    petal.className = 'romantic-petal';
    petal.innerHTML = '🌸';
    
    // Random position
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-10%';
    petal.style.position = 'fixed';
    petal.style.fontSize = (Math.random() * 12 + 8) + 'px';
    petal.style.color = getRandomRomanticColor();
    petal.style.zIndex = '1001';
    petal.style.pointerEvents = 'none';
    petal.style.animation = 'fallDown 6s ease-in forwards';
    
    document.body.appendChild(petal);
    
    // Remove after animation
    setTimeout(() => petal.remove(), 6000);
}

function createLightEffect() {
    const light = document.createElement('div');
    light.className = 'romantic-light';
    light.innerHTML = '💫';
    
    // Random position
    light.style.left = Math.random() * 100 + '%';
    light.style.top = Math.random() * 100 + '%';
    light.style.position = 'fixed';
    light.style.fontSize = (Math.random() * 25 + 20) + 'px';
    light.style.color = getRandomRomanticColor();
    light.style.zIndex = '1001';
    light.style.pointerEvents = 'none';
    light.style.animation = 'lightPulse 3s ease-in-out forwards';
    
    document.body.appendChild(light);
    
    // Remove after animation
    setTimeout(() => light.remove(), 3000);
}

function getRandomRomanticColor() {
    const colors = [
        '#ff6b9d', '#ff9a9e', '#fecfef', '#fecfef',
        '#ff8a80', '#ffab91', '#ffcc80', '#ffe0b2',
        '#f8bbd9', '#e1bee7', '#d1c4e9', '#c5cae9',
        '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createLoveParticlesBurst() {
    const particles = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '🤎'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'love-particle';
            particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.position = 'fixed';
            particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
            particle.style.color = getRandomRomanticColor();
            particle.style.zIndex = '1001';
            particle.style.pointerEvents = 'none';
            particle.style.animation = 'loveParticleBurst 3s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }, i * 50);
    }
}



// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations go here
}, 16)); // 60fps

// ===== CONSOLE MESSAGE =====
console.log(`
🎵 ¡Bienvenido a la Declaratoria Especial! 🎵

Esta página fue creada con:
❤️ HTML5, CSS3, JavaScript
🎨 Bootstrap 5
✨ Animate.css
🔤 Google Fonts
🎭 Font Awesome

Desarrollado con amor para una historia especial.
`);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && e.target === document.body) {
        const mainContent = document.querySelector('main') || document.querySelector('.hero-section');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ===== RESPONSIVE UTILITIES =====
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// ===== FINAL INITIALIZATION =====
window.addEventListener('load', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger any final animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-load').forEach(el => {
            el.classList.add('animate__animated', 'animate__fadeInUp');
        });
    }, 500);
});

// ===== MAIN INTEGRATED STORY FUNCTIONALITY =====
const mainStoryData = [
    {
        message: "Todo comenzó siendo solo amigos del instituto… Las primeras desveladas, las charlas interminables, las risas compartidas, las bromas que solo nosotros entendíamos: nuestro código 'mijin-mijina'. Siempre hubo apoyo mutuo, pero poco a poco empecé a conocerte de verdad, y algo comenzó a crecer, algo que, aunque las circunstancias no lo permitieran, se fue dando naturalmente.",
        image: "images/imagen1.jpg",
        messageDuration: 23000, // 23 seconds
        imageDuration: 8000    // 8 seconds
    },
    {
        message: "Hay tantas historias que podría contarte, pero el tiempo no alcanzaría. Sin embargo, llegó un momento en que supiste que me gustabas, y desde entonces las bromas sobre eso se hicieron constantes.",
        image: "images/imagen2.jpg",
        messageDuration: 23000,
        imageDuration: 8000
    },
    {
        message: "Y aquel momento que jamás olvidaré… porque fue entonces cuando decidí que no quería ceder, que no podía dejar que esto se escapara.",
        image: "images/imagen3.jpg",
        messageDuration: 23000,
        imageDuration: 8000
    },
    {
        message: "En medio de temores, miedos, desconfianza e inseguridades, tú nunca desististe de esta historia. Y por mi parte, tampoco quería dejarte de lado, como si no me importaras.",
        image: "images/imagen4.jpg",
        messageDuration: 23000,
        imageDuration: 8000
    },
    {
        message: "Después de tantos días con altos y bajos sentimentales, lo más valioso que me has dado es dejar de lado tus inseguridades y, en medio de todo, demostrarme que quieres estar conmigo. Me has regalado cariño, mensajes sinceros y momentos únicos que atesoro profundamente.",
        image: "images/imagen5.jpg",
        messageDuration: 23000,
        imageDuration: 8000
    }
];

let mainCurrentStoryIndex = 0;
let mainStoryTimeout = null;
let mainStoryAudio = null;

// ===== MAIN STORY SECTION FUNCTIONS =====
function showMainStorySection() {
    console.log('💕 Mostrando sección principal de historia con imágenes');
    const storySection = document.getElementById('mainStorySection');
    if (storySection) {
        storySection.style.display = 'block';
        storySection.style.opacity = '0';
        storySection.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            storySection.style.transition = 'all 1s ease';
            storySection.style.opacity = '1';
            storySection.style.transform = 'translateY(0)';
        }, 100);
    }
}

function hideMainStorySection() {
    console.log('💕 Ocultando sección principal de historia con imágenes');
    const storySection = document.getElementById('mainStorySection');
    if (storySection) {
        storySection.style.transition = 'all 1s ease';
        storySection.style.opacity = '0';
        storySection.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            storySection.style.display = 'none';
        }, 1000);
    }
}

function startMainStoryTest() {
    console.log('💕 INICIANDO HISTORIA PRINCIPAL DE AMOR');
    
    // Mostrar área de historia
    const storyArea = document.getElementById('mainStoryArea');
    if (storyArea) {
        storyArea.style.display = 'block';
    }
    
    // Inicializar audio
    mainStoryAudio = document.getElementById('mainStoryAudio');
    if (mainStoryAudio) {
        mainStoryAudio.addEventListener('ended', onMainStoryAudioEnded);
        mainStoryAudio.addEventListener('timeupdate', checkMainAudioTime);
        mainStoryAudio.play().then(() => {
            console.log('🎵 Audio principal de historia iniciado');
            startMainStorySequence();
        }).catch(error => {
            console.error('Error playing main story audio:', error);
            startMainStorySequence();
        });
    } else {
        startMainStorySequence();
    }
}

function startMainStorySequence() {
    if (mainCurrentStoryIndex < mainStoryData.length) {
        const currentStory = mainStoryData[mainCurrentStoryIndex];
        
        console.log(`💕 HISTORIA PRINCIPAL ${mainCurrentStoryIndex + 1}:`, currentStory);
        
        // 1. MENSAJE GRANDE Y HERMOSO (23 segundos)
        showMainStoryMessage(currentStory.message, currentStory.messageDuration);
        
        // 2. IMAGEN SOLA DESPUÉS DEL MENSAJE (8 segundos)
        setTimeout(() => {
            showMainStoryImage(currentStory.image, currentStory.imageDuration);
        }, currentStory.messageDuration);
        
        // 3. SIGUIENTE HISTORIA
        mainStoryTimeout = setTimeout(() => {
            mainCurrentStoryIndex++;
            if (mainCurrentStoryIndex < mainStoryData.length) {
                startMainStorySequence();
            } else {
                onMainStoryCompleted();
            }
        }, currentStory.messageDuration + currentStory.imageDuration);
    }
}

function showMainStoryMessage(message, duration) {
    const storyText = document.getElementById('mainStoryText');
    const storyMessage = document.getElementById('mainStoryMessage');
    
    if (storyText && storyMessage) {
        // Mostrar contenedor del mensaje
        storyMessage.style.display = 'block';
        storyMessage.style.opacity = '1';
        storyMessage.style.transform = 'scale(1)';
        
        // Establecer el mensaje completo
        storyText.textContent = message;
        
        // Efecto de desvanecimiento elegante
        storyText.style.opacity = '0';
        storyText.style.transform = 'translateY(20px)';
        
        // Animar entrada
        setTimeout(() => {
            storyText.style.transition = 'all 1.5s ease-out';
            storyText.style.opacity = '1';
            storyText.style.transform = 'translateY(0)';
        }, 100);
        
        // Desvanecer al final
        setTimeout(() => {
            storyText.style.transition = 'all 1s ease-in';
            storyText.style.opacity = '0';
            storyText.style.transform = 'translateY(-20px)';
        }, duration - 1000);
    }
}

function showMainStoryImage(imageSrc, duration) {
    console.log('🖼️ MOSTRANDO IMAGEN PRINCIPAL:', imageSrc);
    console.log('🔍 Elementos encontrados:', {
        storyImage: document.getElementById('mainStoryImage'),
        storyImageElement: document.getElementById('mainStoryImageElement'),
        storyMessage: document.getElementById('mainStoryMessage')
    });
    
    const storyImage = document.getElementById('mainStoryImage');
    const storyImageElement = document.getElementById('mainStoryImageElement');
    const storyMessage = document.getElementById('mainStoryMessage');
    
    if (storyImage && storyImageElement) {
        // 1. OCULTAR MENSAJE
        if (storyMessage) {
            storyMessage.style.opacity = '0';
            storyMessage.style.transform = 'scale(0.9)';
        }
        
        // 2. MOSTRAR IMAGEN DESPUÉS DE TRANSICIÓN
        setTimeout(() => {
            console.log('🔄 Ejecutando transición de imagen...');
            // Ocultar mensaje completamente
            if (storyMessage) {
                storyMessage.style.display = 'none';
                console.log('📝 Mensaje ocultado');
            }
            
            // Establecer y mostrar imagen
            console.log('🖼️ Estableciendo src de imagen:', imageSrc);
            storyImageElement.src = imageSrc;
            storyImage.style.display = 'block';
            storyImage.style.opacity = '1';
            storyImage.style.visibility = 'visible';
            
            console.log('✅ IMAGEN PRINCIPAL SOLA VISIBLE');
            console.log('🔍 Estado de elementos:', {
                storyImageDisplay: storyImage.style.display,
                storyImageOpacity: storyImage.style.opacity,
                storyImageVisibility: storyImage.style.visibility,
                imageSrc: storyImageElement.src
            });
            
            // 3. OCULTAR IMAGEN DESPUÉS DEL TIEMPO
            setTimeout(() => {
                storyImage.style.display = 'none';
                console.log('❌ IMAGEN PRINCIPAL OCULTA');
                
                // 4. PREPARAR SIGUIENTE MENSAJE
                if (storyMessage) {
                    storyMessage.style.display = 'block';
                    storyMessage.style.opacity = '1';
                    storyMessage.style.transform = 'scale(1)';
                }
            }, duration);
            
        }, 500); // Transición suave
        
    } else {
        console.error('❌ ELEMENTOS PRINCIPALES NO ENCONTRADOS');
    }
}

function checkMainAudioTime() {
    if (mainStoryAudio && mainStoryAudio.currentTime >= 155) { // 2:35 = 155 seconds
        mainStoryAudio.pause();
        mainStoryAudio.currentTime = 0;
        console.log('⏹️ Audio principal cortado a los 2:35');
    }
}

function onMainStoryAudioEnded() {
    console.log('🎵 Audio principal de historia terminado');
}

function onMainStoryCompleted() {
    console.log('💕 Historia principal completada con éxito');
    
    // Pausar audio si está reproduciéndose
    if (mainStoryAudio && !mainStoryAudio.paused) {
        mainStoryAudio.pause();
        console.log('⏹️ Audio principal pausado al completar historia');
    }
    
    // Limpiar timeouts
    if (mainStoryTimeout) {
        clearTimeout(mainStoryTimeout);
        mainStoryTimeout = null;
    }
    
    // Habilitar botón Siguiente
    const nextButtonContainer = document.getElementById('mainNextButtonContainer');
    const nextStoryBtn = document.getElementById('mainNextStoryBtn');
    
    if (nextButtonContainer && nextStoryBtn) {
        nextButtonContainer.style.display = 'block';
        nextStoryBtn.disabled = false;
        nextStoryBtn.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
        nextStoryBtn.style.cursor = 'pointer';
        nextStoryBtn.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.3)';
        
        // Agregar evento al botón
        nextStoryBtn.addEventListener('click', function() {
            console.log('🎯 Continuando a video principal');
            hideMainStorySection();
            setTimeout(() => {
                showMainVideoSection();
            }, 1000);
        });
    }
}

// ===== MAIN VIDEO SECTION FUNCTIONS =====
function showMainVideoSection() {
    console.log('🎬 Mostrando sección principal de video final');
    const videoSection = document.getElementById('mainVideoSection');
    if (videoSection) {
        videoSection.style.display = 'block';
        videoSection.style.opacity = '0';
        videoSection.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            videoSection.style.transition = 'all 1s ease';
            videoSection.style.opacity = '1';
            videoSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

function hideMainVideoSection() {
    console.log('🎬 Ocultando sección principal de video final');
    const videoSection = document.getElementById('mainVideoSection');
    if (videoSection) {
        videoSection.style.transition = 'all 1s ease';
        videoSection.style.opacity = '0';
        videoSection.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            videoSection.style.display = 'none';
        }, 1000);
    }
}

function startMainFinalSequence() {
    console.log('🎬 Iniciando secuencia principal final');
    updateMainStatus('🎬 Iniciando el final de nuestra historia...');
    
    const video = document.getElementById('mainFinalVideo');
    const backgroundAudio = document.getElementById('mainBackgroundAudio');
    
    if (video && backgroundAudio) {
        // Ocultar controles del video
        video.controls = false;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        
        // Configurar audio al 10%
        backgroundAudio.volume = 0.1;
        
        // Reproducir audio y video simultáneamente
        Promise.all([
            backgroundAudio.play(),
            video.play()
        ]).then(() => {
            updateMainStatus('🎵 Audio y video iniciados (volumen 10%)');
            console.log('✅ Audio y video principales iniciados correctamente');
            
            // Después de 56 segundos, subir volumen al 100%
            setTimeout(() => {
                backgroundAudio.volume = 1.0;
                updateMainStatus('🔊 Volumen restaurado al 100%');
                console.log('🔊 Volumen principal restaurado al 100%');
            }, 56000); // 56 segundos
            
        }).catch(error => {
            updateMainStatus('❌ Error iniciando secuencia: ' + error.message, 'error');
            console.error('❌ Error principal:', error);
        });
        
        // Cuando termine el video
        video.addEventListener('ended', function() {
            updateMainStatus('💕 ¡Historia completada! Mostrando mensaje final...');
            console.log('💕 Historia principal completada');
            
            // Ocultar el video y mostrar el mensaje final
            setTimeout(() => {
                video.style.display = 'none';
                showMainFinalMessage();
            }, 1000);
        });
    }
}

function showMainFinalMessage() {
    console.log('💕 Mostrando mensaje final principal con imágenes');
    const finalMessage = document.getElementById('mainFinalMessage');
    if (finalMessage) {
        finalMessage.style.display = 'block';
        finalMessage.style.opacity = '0';
        finalMessage.style.transform = 'translateY(30px)';
        
        // Animación de entrada
        setTimeout(() => {
            finalMessage.style.transition = 'all 1s ease';
            finalMessage.style.opacity = '1';
            finalMessage.style.transform = 'translateY(0)';
        }, 100);
        
        // Ocultar el status
        const status = document.getElementById('mainVideoStatus');
        if (status) {
            status.style.display = 'none';
        }
        
        // Después de 8 segundos, ocultar este mensaje y mostrar parte 1
        setTimeout(() => {
            hideMainFinalMessage();
            setTimeout(() => {
                showMainFinalMessagePart1();
            }, 1000);
        }, 8000);
    }
}

function hideMainFinalMessage() {
    const finalMessage = document.getElementById('mainFinalMessage');
    if (finalMessage) {
        finalMessage.style.transition = 'all 1s ease';
        finalMessage.style.opacity = '0';
        finalMessage.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            finalMessage.style.display = 'none';
        }, 1000);
    }
}

function showMainFinalMessagePart1() {
    console.log('💕 Mostrando mensaje final principal parte 1');
    const finalMessagePart1 = document.getElementById('mainFinalMessagePart1');
    if (finalMessagePart1) {
        finalMessagePart1.style.display = 'block';
        finalMessagePart1.style.opacity = '0';
        finalMessagePart1.style.transform = 'translateY(30px)';
        
        // Animación de entrada
        setTimeout(() => {
            finalMessagePart1.style.transition = 'all 1s ease';
            finalMessagePart1.style.opacity = '1';
            finalMessagePart1.style.transform = 'translateY(0)';
        }, 100);
        
        // Después de 23 segundos, ocultar este mensaje y mostrar parte 2
        setTimeout(() => {
            hideMainFinalMessagePart1();
            setTimeout(() => {
                showMainFinalMessagePart2();
            }, 1000);
        }, 23000);
    }
}

function hideMainFinalMessagePart1() {
    const finalMessagePart1 = document.getElementById('mainFinalMessagePart1');
    if (finalMessagePart1) {
        finalMessagePart1.style.transition = 'all 1s ease';
        finalMessagePart1.style.opacity = '0';
        finalMessagePart1.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            finalMessagePart1.style.display = 'none';
        }, 1000);
    }
}

function showMainFinalMessagePart2() {
    console.log('💕 Mostrando mensaje final principal parte 2');
    const finalMessagePart2 = document.getElementById('mainFinalMessagePart2');
    if (finalMessagePart2) {
        finalMessagePart2.style.display = 'block';
        finalMessagePart2.style.opacity = '0';
        finalMessagePart2.style.transform = 'translateY(30px)';
        
        // Animación de entrada
        setTimeout(() => {
            finalMessagePart2.style.transition = 'all 1s ease';
            finalMessagePart2.style.opacity = '1';
            finalMessagePart2.style.transform = 'translateY(0)';
        }, 100);
        
        // Después de 23 segundos, ocultar este mensaje y mostrar la declaratoria
        setTimeout(() => {
            hideMainFinalMessagePart2();
            setTimeout(() => {
                showMainDeclaration();
            }, 1000);
        }, 23000);
    }
}

function hideMainFinalMessagePart2() {
    const finalMessagePart2 = document.getElementById('mainFinalMessagePart2');
    if (finalMessagePart2) {
        finalMessagePart2.style.transition = 'all 1s ease';
        finalMessagePart2.style.opacity = '0';
        finalMessagePart2.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            finalMessagePart2.style.display = 'none';
        }, 1000);
    }
}

function showMainDeclaration() {
    console.log('💕 Mostrando declaratoria final principal');
    const declaration = document.getElementById('mainDeclaration');
    if (declaration) {
        declaration.style.display = 'block';
        declaration.style.opacity = '0';
        declaration.style.transform = 'translateY(30px)';
        
        // Animación de entrada
        setTimeout(() => {
            declaration.style.transition = 'all 1.5s ease';
            declaration.style.opacity = '1';
            declaration.style.transform = 'translateY(0)';
        }, 100);
    }
}

function updateMainStatus(message, type = 'info') {
    const status = document.getElementById('mainVideoStatus');
    if (status) {
        status.innerHTML = message;
        status.style.background = type === 'error' ? 'rgba(220, 53, 69, 0.2)' : 
                                 type === 'success' ? 'rgba(40, 167, 69, 0.2)' : 
                                 'rgba(255, 255, 255, 0.1)';
    }
}

// ===== UNIFIED FLOW FUNCTIONS =====
function showStorySection() {
    console.log('🎯 Iniciando flujo unificado: Historia con imágenes');
    showMainStorySection();
}

function showVideoSection() {
    console.log('🎯 Continuando flujo unificado: Video final');
    showMainVideoSection();
}

// ===== EVENT LISTENERS FOR MAIN SECTIONS =====
window.addEventListener('load', function() {
    // Event listener for mainStartStoryBtn (in main story section)
    const mainStartStoryBtn = document.getElementById('mainStartStoryBtn');
    if (mainStartStoryBtn) {
        mainStartStoryBtn.addEventListener('click', function() {
            mainStartStoryBtn.style.display = 'none';
            startMainStoryTest();
        });
    }
    
    // Event listener for mainStartFinalBtn (in main video section)
    const mainStartFinalBtn = document.getElementById('mainStartFinalBtn');
    if (mainStartFinalBtn) {
        mainStartFinalBtn.addEventListener('click', function() {
            mainStartFinalBtn.style.display = 'none';
            startMainFinalSequence();
        });
    }
    

    // Event listener for continueBtn (skip lyrics) - UNIFIED FLOW
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            console.log('🎯 Saltando letras para ir a gratitud - BOTÓN CONTINUAR CLICKEADO');
            
            // Detener audio y letras
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                console.log('🔇 Audio detenido');
            }
            
            // Ocultar sección de letras
            const lyricsContainer = document.getElementById('lyricsContainer');
            if (lyricsContainer) {
                lyricsContainer.classList.remove('show');
                console.log('📝 Sección de letras ocultada');
            }
            
            // Mostrar mensaje de gratitud directamente
            console.log('💕 Mostrando mensaje de gratitud');
            showGratitudeMessage();
        });
    }

    // Event listener for continueStoryBtn (from gratitude message) - UNIFIED FLOW
    const continueStoryBtn = document.getElementById('continueStoryBtn');
    if (continueStoryBtn) {
        continueStoryBtn.addEventListener('click', function() {
            console.log('🎯 Continuando flujo unificado a historia con imágenes');
            
            // Detener audio y letras si están activos
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                console.log('🔇 Audio detenido');
            }
            
            // Ocultar sección de letras si está visible
            const lyricsContainer = document.getElementById('lyricsContainer');
            if (lyricsContainer && lyricsContainer.classList.contains('show')) {
                lyricsContainer.classList.remove('show');
                console.log('📝 Sección de letras ocultada');
            }
            
            // Ocultar mensaje de gratitud si está visible
            const gratitudeMessage = document.getElementById('gratitudeMessage');
            if (gratitudeMessage && gratitudeMessage.classList.contains('show')) {
                gratitudeMessage.classList.remove('show');
                console.log('💕 Mensaje de gratitud ocultado');
            }
            
            // Mostrar la historia directamente
            showStorySection();
        });
    }
    
});
