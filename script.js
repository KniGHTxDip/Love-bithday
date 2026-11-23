/**
 * ============================================================================
 * Romantic Winter-Night Birthday Website for Tulika
 * Crafted with love by Dip (দীপ)
 * Vanilla JavaScript (No frameworks, No build step)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. CONFIGURATION
// ----------------------------------------------------------------------------
const SENDER_NAME = "তোমার দীপ (Dip)";
const PARTNER_NAME = "Tulika";

document.addEventListener("DOMContentLoaded", () => {
  // Update signature line dynamically
  const signatureDisplay = document.getElementById("signatureDisplay");
  if (signatureDisplay && SENDER_NAME) {
    signatureDisplay.textContent = `ইতি, তোমার সবচেয়ে ভালোবাসার মানুষ — ${SENDER_NAME} 💕`;
  }

  // Initialize all interactive modules
  initCanvasFx();
  initCinematicStoryIntro();
  initEnvelopeInteraction();
  initScrollAnimations();
  initPolaroidPicker();
  initMemoriesLightbox();
  initCakeCandle();
  initFinalLoveButton();
  initAudioPlayer();
  initLoveMeter();
  initQuiz();
  initCoupons();
  initTapHeartTrail();
});

// ----------------------------------------------------------------------------
// 2. CANVAS ENGINE: Pure Snowfall (Smooth 60fps) + GPU-Accelerated Floating Emojis
// ----------------------------------------------------------------------------
let fxCanvas, fxCtx;
let snowflakes = [];
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initCanvasFx() {
  fxCanvas = document.getElementById("fxCanvas");
  if (!fxCanvas) return;
  fxCtx = fxCanvas.getContext("2d");

  function resize() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    fxCanvas.width = canvasWidth;
    fxCanvas.height = canvasHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const isMobile = window.innerWidth < 600;
  const flakeCount = prefersReducedMotion ? 0 : (isMobile ? 30 : 60);

  for (let i = 0; i < flakeCount; i++) {
    snowflakes.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.6 + 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01
    });
  }

  // 100% Locked 60fps, Zero Canvas Glyph Overhead
  function render() {
    fxCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!prefersReducedMotion) {
      for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        flake.wobble += flake.wobbleSpeed;
        flake.y += flake.speedY;
        flake.x += Math.sin(flake.wobble) * 0.4 + flake.speedX;

        if (flake.y > canvasHeight + 5) {
          flake.y = -5;
          flake.x = Math.random() * canvasWidth;
        }
        if (flake.x > canvasWidth + 5) flake.x = -5;
        if (flake.x < -5) flake.x = canvasWidth + 5;

        fxCtx.beginPath();
        fxCtx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        fxCtx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        fxCtx.fill();
      }
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// ----------------------------------------------------------------------------
// GPU-ACCELERATED FLOATING EMOJI ENGINE (Butter-Smooth, Zero-Lag)
// ----------------------------------------------------------------------------
function spawnEmoji(x, y, emoji, { driftX = 0, driftY = -220, duration = 1800, size = 24, rot = 0 } = {}) {
  if (prefersReducedMotion) return;
  const el = document.createElement("span");
  el.className = "floating-emoji";
  el.textContent = emoji;
  el.style.left = "0px";
  el.style.top = "0px";
  el.style.fontSize = `${size}px`;
  el.style.setProperty("--x", `${x}px`);
  el.style.setProperty("--y", `${y}px`);
  el.style.setProperty("--drift-x", `${driftX}px`);
  el.style.setProperty("--drift-y", `${driftY}px`);
  el.style.setProperty("--rot", `${rot}deg`);
  el.style.setProperty("--duration", `${duration}ms`);
  document.body.appendChild(el);

  // Automatically remove element from DOM when animation completes
  el.addEventListener("animationend", () => {
    el.remove();
  }, { once: true });
}

// Smooth Burst from a specific element or coordinates
function triggerParticleBurst(originX, originY, emojis = ["💖", "🌸", "✨", "💕"], count = 24, speedMultiplier = 1) {
  if (prefersReducedMotion) return;
  for (let i = 0; i < count; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = (Math.random() * 110 + 35) * speedMultiplier;
    const driftX = Math.cos(angle) * distance;
    const driftY = Math.sin(angle) * distance - (Math.random() * 50 + 25);
    const duration = Math.random() * 600 + 1400;
    const size = Math.random() * 10 + 20;
    const rot = (Math.random() - 0.5) * 60;

    spawnEmoji(originX, originY, emoji, { driftX, driftY, duration, size, rot });
  }
}

// Romantic Heart Shower (Fountain rising from the button into the air gracefully)
function triggerHeartShower(originX, originY, count = 35) {
  if (prefersReducedMotion) return;
  const emojis = ["💖", "💗", "💓", "💘", "🌸", "✨", "🥰"];
  
  const baseX = originX || (window.innerWidth / 2);
  const baseY = originY || (window.innerHeight * 0.75);

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const startX = baseX + (Math.random() * 120 - 60);
      const startY = baseY + (Math.random() * 20 - 10);
      const driftX = (Math.random() - 0.5) * 200;
      const driftY = -(Math.random() * 260 + 200); // Floats upward into the sky
      const duration = Math.random() * 700 + 1600;
      const size = Math.random() * 12 + 22;
      const rot = (Math.random() - 0.5) * 45;

      spawnEmoji(startX, startY, emoji, { driftX, driftY, duration, size, rot });
    }, i * 40);
  }
}

function initTapHeartTrail() {
  window.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button") || e.target.closest("input") || e.target.closest(".wax-seal") || e.target.closest(".cake-box")) return;
    const emojis = ["💖", "🌸", "✨", "💕", "🤍"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    spawnEmoji(e.clientX, e.clientY, emoji, {
      driftX: (Math.random() - 0.5) * 30,
      driftY: -(Math.random() * 40 + 35),
      duration: 1100,
      size: 18,
      rot: (Math.random() - 0.5) * 30
    });
  });
}

// ----------------------------------------------------------------------------
// 3. CINEMATIC CARTOON STORY: DIP & TULIKA WALKING ON FOOT
// ----------------------------------------------------------------------------
let storyTimers = [];

function initCinematicStoryIntro() {
  const cartoonDip = document.getElementById("cartoonDip");
  const cartoonTulika = document.getElementById("cartoonTulika");
  const bubbleDip = document.getElementById("bubbleDip");
  const bubbleDipText = document.getElementById("bubbleDipText");
  const bubbleTulika = document.getElementById("bubbleTulika");
  const storyHeart = document.getElementById("storyHeart");
  const storyStage = document.getElementById("storyStage");
  const envelopeScene = document.getElementById("envelopeScene");
  const envelopeHint = document.getElementById("envelopeHint");
  const skipStoryBtn = document.getElementById("skipStoryBtn");

  function stopWalkingAndStand() {
    if (cartoonDip) {
      cartoonDip.classList.remove("is-walking");
      cartoonDip.classList.add("is-standing");
    }
    if (cartoonTulika) {
      cartoonTulika.classList.remove("is-walking");
      cartoonTulika.classList.add("is-standing");
    }
  }

  function revealEnvelopeHandoff() {
    storyTimers.forEach(t => clearTimeout(t));

    stopWalkingAndStand();

    if (bubbleDip) bubbleDip.classList.add("hidden");
    if (bubbleTulika) bubbleTulika.classList.add("hidden");
    if (storyHeart) storyHeart.classList.remove("hidden");

    if (storyStage) storyStage.classList.add("handoff-done");

    if (envelopeScene) {
      envelopeScene.classList.remove("hidden");
      const rect = envelopeScene.getBoundingClientRect();
      triggerParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ["✨", "💌", "💖", "🌸"], 35, 1.3);
    }
    if (envelopeHint) envelopeHint.classList.remove("hidden");
    if (skipStoryBtn) skipStoryBtn.style.display = "none";
  }

  if (skipStoryBtn) {
    skipStoryBtn.addEventListener("click", revealEnvelopeHandoff);
  }

  // Step 1: Characters finish walking on foot at 1.5s and stand together
  storyTimers.push(setTimeout(() => {
    stopWalkingAndStand();
    if (storyHeart) storyHeart.classList.remove("hidden");
    const rect = storyStage.getBoundingClientRect();
    triggerParticleBurst(rect.left + rect.width / 2, rect.top + 50, ["💖", "✨"], 15, 0.8);
  }, 1500));

  // Step 2: At 2.0s, Dip says "Happy Birthday, আমার বেবি! 🎂💖"
  storyTimers.push(setTimeout(() => {
    if (bubbleDip) {
      bubbleDipText.textContent = "Happy Birthday, আমার বেবি! 🎂💖";
      bubbleDip.classList.remove("hidden");
      playNote(523.25, (getAudioContext() ? getAudioContext().currentTime : 0), 0.5, "sine", 0.05);
    }
  }, 2000));

  // Step 3: At 4.2s, Tulika smiles and says "Thank you so much, আমার দীপ! 🥰🌸"
  storyTimers.push(setTimeout(() => {
    if (bubbleTulika) {
      bubbleTulika.classList.remove("hidden");
      playNote(659.25, (getAudioContext() ? getAudioContext().currentTime : 0), 0.5, "sine", 0.05);
    }
  }, 4200));

  // Step 4: At 6.6s, Dip extends letter: "আজ তোমার জন্য হৃদয়ের সব ভালোবাসা দিয়ে এই চিঠিটা লিখেছি... এই নাও, বেবি! 💌"
  storyTimers.push(setTimeout(() => {
    if (bubbleTulika) bubbleTulika.classList.add("hidden");
    if (bubbleDip) {
      bubbleDipText.textContent = "আজ তোমার জন্য হৃদয়ের সব ভালোবাসা দিয়ে এই চিঠিটা লিখেছি... এই নাও, বেবি! 💌";
      playNote(783.99, (getAudioContext() ? getAudioContext().currentTime : 0), 0.6, "sine", 0.06);
    }
  }, 6600));

  // Step 5: At 9.0s, Envelope appears in the center ready for Tulika to tap!
  storyTimers.push(setTimeout(() => {
    revealEnvelopeHandoff();
  }, 9000));
}

// ----------------------------------------------------------------------------
// 4. ENVELOPE OPENING & LETTER UNFOLD SEQUENCE (FIXED BLANK SCREEN)
// ----------------------------------------------------------------------------
function initEnvelopeInteraction() {
  const envelope = document.getElementById("envelopeCard");
  const introScreen = document.getElementById("introScreen");
  const letterWrapper = document.getElementById("letterWrapper");
  const letterPaper = document.getElementById("letterPaper");
  let isOpen = false;

  function openEnvelope() {
    if (isOpen) return;
    isOpen = true;

    envelope.classList.add("is-open");

    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    triggerParticleBurst(centerX, centerY, ["💖", "💕", "🌸", "✨", "💌"], 40, 1.4);

    startMusicOnInteraction();

    setTimeout(() => {
      introScreen.classList.add("is-hidden");
      introScreen.style.display = "none";

      letterWrapper.classList.remove("hidden");
      window.scrollTo(0, 0);

      requestAnimationFrame(() => {
        letterPaper.classList.add("unfolded");
        triggerParticleBurst(window.innerWidth / 2, 80, ["✨", "🌸", "💖"], 25, 0.8);
      });
    }, 600);
  }

  envelope.addEventListener("click", openEnvelope);

  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });
}

// ----------------------------------------------------------------------------
// 5. SCROLL ANIMATIONS (IntersectionObserver)
// ----------------------------------------------------------------------------
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-up, .slide-left");

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach(el => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  animatedElements.forEach(el => observer.observe(el));
}

// ----------------------------------------------------------------------------
// 6. POLAROID PHOTO PICKER (FileReader Gallery Preview)
// ----------------------------------------------------------------------------
function initPolaroidPicker() {
  const polaroidTulika = document.getElementById("polaroidTulika");
  const polaroidUs = document.getElementById("polaroidUs");
  const fileInput = document.getElementById("polaroidFileInput");
  let activeTargetImgId = null;

  function selectPhoto(imgId) {
    activeTargetImgId = imgId;
    fileInput.click();
  }

  polaroidTulika.addEventListener("click", () => selectPhoto("imgTulika"));
  polaroidUs.addEventListener("click", () => selectPhoto("imgUs"));

  [polaroidTulika, polaroidUs].forEach(card => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const imgId = card.id === "polaroidTulika" ? "imgTulika" : "imgUs";
        selectPhoto(imgId);
      }
    });
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && activeTargetImgId) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const targetImg = document.getElementById(activeTargetImgId);
        if (targetImg) {
          targetImg.src = loadEvent.target.result;
          const rect = targetImg.getBoundingClientRect();
          triggerParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ["✨", "💖", "🌸"], 20);
        }
      };
      reader.readAsDataURL(file);
    }
    fileInput.value = "";
  });
}

// ----------------------------------------------------------------------------
// 7. CREATIVE MEMORIES SCRAPBOOK & LIGHTBOX
// ----------------------------------------------------------------------------
function initMemoriesLightbox() {
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const memoryCards = document.querySelectorAll(".memory-scrapbook-card");

  function openLightbox(imgSrc, captionText) {
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }, 300);
  }

  memoryCards.forEach(card => {
    const photo = card.querySelector(".scrapbook-photo");
    const caption = card.querySelector(".scrapbook-caption");

    card.addEventListener("click", () => {
      if (photo) {
        openLightbox(photo.src, caption ? caption.textContent : "");
        const rect = card.getBoundingClientRect();
        triggerParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ["💖", "✨"], 15);
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (photo) openLightbox(photo.src, caption ? caption.textContent : "");
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// ----------------------------------------------------------------------------
// 8. INTERACTIVE: LOVE METER FOR DIP (Defaults to 0%)
// ----------------------------------------------------------------------------
function initLoveMeter() {
  const loveSlider = document.getElementById("loveSlider");
  const meterPercent = document.getElementById("meterPercent");
  const meterEmoji = document.getElementById("meterEmoji");
  const meterReaction = document.getElementById("meterReaction");
  const lockLoveBtn = document.getElementById("lockLoveBtn");

  if (!loveSlider) return;

  function updateMeter() {
    const val = parseInt(loveSlider.value, 10);
    meterPercent.textContent = val + "%";
    loveSlider.style.background = `linear-gradient(to right, #ff7aa8 0%, #d6336c ${val}%, #e6dbe9 ${val}%, #e6dbe9 100%)`;

    if (val === 0) {
      meterEmoji.textContent = "🥺";
      meterReaction.textContent = "এইটুকুও না? ০%? স্লাইডারটা টেনে বাড়াও বেবি, তোমার দীপ অপেক্ষা করছে! 🥺💔";
    } else if (val < 25) {
      meterEmoji.textContent = "🥺";
      meterReaction.textContent = "এইটুকু? সত্যি বেবি? আর একটু বাড়াও না, সোনা... তোমার দীপ অপেক্ষা করছে! 🥺";
    } else if (val < 50) {
      meterEmoji.textContent = "🙈";
      meterReaction.textContent = "শুধু অর্ধেক? আরও একটু ভালোবাসো তোমার দীপকে, বেবি! 🤭";
    } else if (val < 75) {
      meterEmoji.textContent = "🌸";
      meterReaction.textContent = "অনেকটা! কিন্তু দীপকে তো আরও বেশি ভালোবাসা যায়! 💖";
    } else if (val < 100) {
      meterEmoji.textContent = "🥰";
      meterReaction.textContent = "অনেক অনেক বেশি! দীপের পুরো পৃথিবী জুড়ে শুধুই তুমি, বেবি! 💞";
    } else {
      meterEmoji.textContent = "💖";
      meterPercent.textContent = "১০০% (অসীম ♾️)";
      meterReaction.textContent = "পুরো হৃদয়টা জুড়ে! বেবি, দীপও তোমায় অসীম ভালোবাসে! 🚀✨💍";
    }
  }

  loveSlider.addEventListener("input", updateMeter);
  updateMeter(); // Initialize immediately at 0%

  if (lockLoveBtn) {
    lockLoveBtn.addEventListener("click", () => {
      const rect = lockLoveBtn.getBoundingClientRect();
      triggerParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ["💖", "💍", "✨", "🌸", "🥰"], 35, 1.3);
      triggerHeartShower(null, null, 35);
      lockLoveBtn.textContent = "🔒 দীপের জন্য ভালোবাসা আজীবন লক হয়ে গেল! 💍";
      lockLoveBtn.style.background = "#2e7d32";
      playBirthdayChime();
    });
  }
}

// ----------------------------------------------------------------------------
// 9. INTERACTIVE: ROMANTIC MINI QUIZ FROM DIP
// ----------------------------------------------------------------------------
function initQuiz() {
  const quizCards = document.querySelectorAll(".quiz-card");

  const answersData = {
    "1": {
      "1": "হুমম... কিন্তু সত্যি বলতে তোমার দীপ তোমাকে তোমার চেয়েও বেশি ভালোবাসে, বেবি! 💕",
      "2": "একদম ঠিক উত্তর! তোমার দীপ তোমায় সারাজীবন এভাবেই ভালোবাসবে, আমার লক্ষ্মী মেয়ে! 👑🥰",
      "3": "একদম সত্যি! তুলিকা আর দীপের হৃদয় মিলেমিশে এক হয়ে গেছে 💞"
    },
    "2": {
      "1": "কফির প্রতিটি চুমুকে তোমার চোখ দুটো দেখা দীপের জীবনের সবচেয়ে প্রিয় মুহূর্ত! ☕💖",
      "2": "শীতের হিমেল বাতাসে তোমার হাত ধরে হেঁটে চলা... সারাজীবন এভাবেই পাশে থাকবে তোমার দীপ! 🤝❄️",
      "3": "আমার কাঁধে মাথা রাখলে দুনিয়ার সব ক্লান্তি ভুলে যাই, সোনা! 🥰💞"
    },
    "3": {
      "1": "ওয়াদা করলাম! প্রতিটা জীবনে, প্রতিটা শীতে তোমার দীপ শুধু তোমার পাশেই থাকবে! 💍💫",
      "2": "তোমার এই হাসিটাই তো দীপের বেঁচে থাকার রসদ, সবসময় হাসবে সোনা! 🌸❤️",
      "3": "তোমার সব আবদার দীপের হুকুম! জন্মদিনের সব সুখ তোমার জন্য! 👑🎉"
    }
  };

  quizCards.forEach(card => {
    const qId = card.getAttribute("data-quiz");
    const options = card.querySelectorAll(".quiz-opt");
    const feedback = card.querySelector(".quiz-feedback");

    options.forEach(opt => {
      opt.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");

        const ansId = opt.getAttribute("data-ans");
        const replyText = answersData[qId] && answersData[qId][ansId];

        if (feedback && replyText) {
          feedback.textContent = replyText;
          feedback.classList.remove("hidden");

          const rect = opt.getBoundingClientRect();
          triggerParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ["✨", "💖", "🌸"], 15, 0.8);
          playNote(587.33, (getAudioContext() ? getAudioContext().currentTime : 0), 0.6, "sine", 0.06);
        }
      });
    });
  });
}

// ----------------------------------------------------------------------------
// 10. INTERACTIVE: ROMANTIC COUPONS FROM DIP
// ----------------------------------------------------------------------------
function initCoupons() {
  const couponCards = document.querySelectorAll(".coupon-card");

  couponCards.forEach(card => {
    const btn = card.querySelector(".coupon-claim-btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.classList.contains("claimed")) return;

      btn.classList.add("claimed");
      btn.textContent = "✅ রিডিমড! দীপের ভালোবাসা কনফার্মড 💖";

      const rect = btn.getBoundingClientRect();
      triggerParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ["🎉", "💖", "✨", "🍫", "🫂"], 25, 1.2);
      playBirthdayChime();
    });

    card.addEventListener("click", () => {
      if (!btn.classList.contains("claimed")) btn.click();
    });
  });
}

// ----------------------------------------------------------------------------
// 11. BIRTHDAY CAKE & FLICKERING CANDLE BLOWOUT
// ----------------------------------------------------------------------------
function initCakeCandle() {
  const cakeBox = document.getElementById("cakeBox");
  const candleWrap = document.getElementById("candleWrap");
  const cakeCaption = document.getElementById("cakeCaption");
  const wishedBadge = document.getElementById("wishedBadge");
  let isBlown = false;

  function blowCandle() {
    if (isBlown) return;
    isBlown = true;

    candleWrap.classList.add("is-blown");
    cakeCaption.style.display = "none";
    wishedBadge.classList.remove("hidden");

    const rect = cakeBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + 30;

    const waves = [
      { delay: 0,   emojis: ["🎉", "✨", "🎂"] },
      { delay: 350, emojis: ["💖", "🌸", "🎊"] },
      { delay: 700, emojis: ["✨", "🥰", "🎉"] },
      { delay: 1050, emojis: ["💖", "🎂", "🌸"] },
      { delay: 1400, emojis: ["🎊", "✨", "💖"] }
    ];

    waves.forEach(wave => {
      setTimeout(() => {
        triggerParticleBurst(centerX, centerY, wave.emojis, 35, 1.4);
      }, wave.delay);
    });

    playBirthdayChime();
  }

  cakeBox.addEventListener("click", blowCandle);
  cakeBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      blowCandle();
    }
  });
}

// ----------------------------------------------------------------------------
// 12. FINAL LOVE BUTTON (TULIKA'S REACTION TO DIP)
// ----------------------------------------------------------------------------
function initFinalLoveButton() {
  const loveBtn = document.getElementById("loveBtn");
  if (!loveBtn) return;

  loveBtn.addEventListener("click", () => {
    const rect = loveBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    triggerParticleBurst(x, y, ["💖", "💗", "💓", "💘", "✨"], 20, 1.1);
    triggerHeartShower(x, y, 36);

    const btnText = loveBtn.querySelector(".btn-text");
    if (btnText) {
      btnText.textContent = "দীপ, আমি তোমাকে অনেক অনেক ভালোবাসি! 🥰💖";
    }

    playRomanticChord();
  });
}

// ----------------------------------------------------------------------------
// 13. AUDIO SYSTEM: Automatic Background Music + Instant First-Touch Trigger
// ----------------------------------------------------------------------------
let audioCtx = null;
let isAudioPlaying = false;

function initAudioPlayer() {
  const audioControl = document.getElementById("audioControl");
  const bgMusic = document.getElementById("bgMusic");
  const audioTooltip = audioControl ? audioControl.querySelector(".audio-tooltip") : null;

  if (!audioControl || !bgMusic) return;

  function markPlaying() {
    isAudioPlaying = true;
    audioControl.classList.add("playing");
    if (audioTooltip) audioTooltip.textContent = "মিউজিক বন্ধ করো";
    stopSynthMelody();
  }

  function markPaused() {
    isAudioPlaying = false;
    audioControl.classList.remove("playing");
    if (audioTooltip) audioTooltip.textContent = "মিউজিক চালু করো";
    stopSynthMelody();
  }

  function playMusic() {
    if (bgMusic && bgMusic.src) {
      bgMusic.play().then(() => {
        markPlaying();
      }).catch(() => {
        // Autoplay policy prevented immediate playback; will unlock on first user tap/touch
      });
    } else {
      startSynthMelody();
      markPlaying();
    }
  }

  function pauseMusic() {
    markPaused();
    if (bgMusic) bgMusic.pause();
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  audioControl.addEventListener("click", toggleAudio);
  audioControl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAudio();
    }
  });

  // 1. Attempt immediate autoplay when page loads
  playMusic();

  // 2. Global Autoplay Unlock: modern mobile browsers (iOS Safari, Android Chrome) 
  // require one gesture to play audio. The very first touch/click anywhere on the screen
  // immediately starts the music seamlessly!
  const unlockEvents = ["pointerdown", "touchstart", "click", "keydown", "scroll"];
  const unlockAudio = () => {
    if (!isAudioPlaying) {
      bgMusic.play().then(() => {
        markPlaying();
        unlockEvents.forEach(evt => window.removeEventListener(evt, unlockAudio));
      }).catch(() => {});
    } else {
      unlockEvents.forEach(evt => window.removeEventListener(evt, unlockAudio));
    }
  };

  unlockEvents.forEach(evt => {
    window.addEventListener(evt, unlockAudio, { passive: true, once: false });
  });
}

function startMusicOnInteraction() {
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic && !isAudioPlaying) {
    bgMusic.play().then(() => {
      const audioControl = document.getElementById("audioControl");
      if (audioControl) {
        audioControl.classList.add("playing");
        const tooltip = audioControl.querySelector(".audio-tooltip");
        if (tooltip) tooltip.textContent = "মিউজিক বন্ধ করো";
      }
      isAudioPlaying = true;
    }).catch(() => {});
  }
}

let synthInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playNote(freq, startTime, duration, type = "sine", gainVal = 0.08) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function startSynthMelody() {
  const ctx = getAudioContext();
  if (!ctx || synthInterval) return;

  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  let step = 0;

  synthInterval = setInterval(() => {
    if (!isAudioPlaying) {
      stopSynthMelody();
      return;
    }
    const now = ctx.currentTime;
    const note = notes[step % notes.length];
    playNote(note, now, 1.2, "sine", 0.04);
    if (step % 2 === 0) {
      playNote(note * 1.5, now + 0.25, 1.0, "triangle", 0.02);
    }
    step++;
  }, 650);
}

function stopSynthMelody() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

function playBirthdayChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const arpeggio = [523.25, 659.25, 783.99, 1046.50];
  arpeggio.forEach((freq, idx) => {
    playNote(freq, now + idx * 0.12, 1.0, "sine", 0.09);
  });
}

function playRomanticChord() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const chord = [349.23, 440.00, 523.25, 659.25];
  chord.forEach((freq) => {
    playNote(freq, now, 2.0, "sine", 0.07);
  });
}
