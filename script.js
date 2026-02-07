// ===== Elements =====
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const message = document.getElementById("message");
const gif = document.getElementById("gif");
const gifCaption = document.getElementById("gifCaption");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Name modal
const nameModal = document.getElementById("nameModal");
const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");



// Envelope modal
const envelopeModal = document.getElementById("envelopeModal");
const envTitle = document.getElementById("envTitle");
const envText = document.getElementById("envText");
const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");
const envelopeArt = document.getElementById("envelopeArt");

// Letter modal
const letterModal = document.getElementById("letterModal");
const letterTitle = document.getElementById("letterTitle");
const letterHeadText = document.getElementById("letterHeadText");
const typedLetter = document.getElementById("typedLetter");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const scrollHint = document.getElementById("scrollHint");

// Kiss sound + stamp
const kissSfx = document.getElementById("kissSfx");
const kissStamp = document.getElementById("kissStamp");

let personName = "Cutie";
let noClicks = 0;

// ===== Helpers =====
function getLetterSheet() {
  return letterModal.querySelector(".letter-sheet");
}

function updateScrollHint() {
  const sheet = getLetterSheet();
  if (!sheet) return;

  const overflow = sheet.scrollHeight > sheet.clientHeight + 2;
  const nearBottom = sheet.scrollTop + sheet.clientHeight >= sheet.scrollHeight - 6;

  if (overflow && !nearBottom) scrollHint.classList.add("show");
  else scrollHint.classList.remove("show");
}

function playKiss() {
  // Optional: put kiss.mp3 in your folder
  kissSfx.currentTime = 0;
  kissSfx.volume = 0.9;
  kissSfx.play().catch(() => {});
}

function showKiss() {
  kissStamp.classList.remove("show");
  void kissStamp.offsetWidth;
  kissStamp.classList.add("show");
}

// ===== Name modal on load =====
window.addEventListener("load", () => {
  nameModal.style.display = "grid";
  setTimeout(() => nameInput.focus(), 60);
});

function startWithName() {
  const raw = (nameInput.value || "").trim();
  personName = raw ? raw : "Cutie";

  title.textContent = `${personName}, will you be my Valentine? 💖`;
  subtitle.textContent = `A simple “Yes” and you’ll make someone very happy 😌`;
  message.textContent = `Alright ${personName}… choose the answer that feels like a hug 💞`;
  gifCaption.textContent = `Me right now: smiling first, panicking later 😳`;

  nameModal.style.display = "none";
}

startBtn.addEventListener("click", startWithName);
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startWithName();
});

// ===== NO / YES content =====
const noLines = [
  "Hmm… that “No” was loud 😳 Are you *really* sure?",
  "Wait… think again. I’m extremely cute and emotionally available 😭💗",
  "Ouch. My heart just did a backflip… into sadness 💔",
  "Okay but imagine us being adorable together… come on 🥺🌹",
  "I’m starting to cry in 4K 😭📸",
  "Fine… I’ll just sit here… cute and devastated 😔"
];

const captionsNo = [
  "Now I’m sad. Look what you did 😭",
  "My heart is buffering… 💔",
  "This is emotional damage 🎻",
  "Okay… I forgive you if you press Yes 😌",
  "I’m still waiting… 👉👈",
  "Be nice to me… I’m sensitive 😔"
];

const sadGifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lY2x6d2N2Y3E2bWd0Z2Z1eHJxZ2o1Z3d1bGx2N2ZkOHd4dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OPU6wzx8JrHna/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmd0dXQ0b2Q5bGZkZ2w0d2w0aGx0c2pzaW1yZ2p0dWZxY3N6aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9Y5BbDSkSTiY8/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V5c2l2a2MybnM5OGt4NnY4YzQ0Y2Q0OTYwdzZkYzF4bGU1aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ISOckXUybVfQ4/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFqajE3dHczYW94dW9qMGozY2o3aTRvZGF2NjhrODQxMWF5dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6wrvdHFbwBrUFenu/giphy.gif"
];

const happyGif =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2VnOGN5N3ZrbG03YmNwcWJ3Z2lhcTQ4eGozdnp0bWZ4Z2VtNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif";

function setButtonSizes() {
  const yesScale = 1 + noClicks * 0.10;
  const noScale  = Math.max(0.45, 1 - noClicks * 0.09);

  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.transform  = `scale(${noScale})`;

  yesBtn.style.fontSize = `${16 + noClicks * 1.5}px`;
  noBtn.style.fontSize  = `${16 - Math.min(6, noClicks * 0.8)}px`;

  if (noClicks >= 4) noBtn.style.opacity = "0.75";
  if (noClicks >= 6) noBtn.style.opacity = "0.55";
}

noBtn.addEventListener("click", () => {
  noClicks++;

  message.textContent = noLines[Math.min(noClicks - 1, noLines.length - 1)];
  gifCaption.textContent = captionsNo[(noClicks - 1) % captionsNo.length];

  setButtonSizes();
  gif.src = sadGifs[(noClicks - 1) % sadGifs.length];

  noBtn.animate(
    [
      { transform: noBtn.style.transform + " translateX(0px)" },
      { transform: noBtn.style.transform + " translateX(-6px)" },
      { transform: noBtn.style.transform + " translateX(6px)" },
      { transform: noBtn.style.transform + " translateX(0px)" }
    ],
    { duration: 220 }
  );
});

// YES: kiss + confetti + envelope
yesBtn.addEventListener("click", () => {
  title.textContent = "YAYYYY!! 💞";
  subtitle.textContent = `${personName}, you just made my heart do cartwheels 😭💗`;
  message.textContent = `Okay… I kept something special for you. Open it 💌`;
  gifCaption.textContent = "Me: pretending I’m calm (I’m not) 😌";

  gif.src = happyGif;

  yesBtn.disabled = true;
  noBtn.disabled = true;
  noBtn.style.opacity = "0.35";

  playKiss();
  showKiss();
  launchConfetti();
  bigHeartsBurst();

  setTimeout(() => {
    envelopeArt.classList.remove("opened");
    envTitle.textContent = `For ${personName} 💌`;
    envText.textContent = "This note is soft. Please read it gently 🥺";
    envelopeModal.style.display = "grid";
  }, 650);
});

openEnvelopeBtn.addEventListener("click", () => {
  envelopeArt.classList.add("opened");
  setTimeout(() => {
    envelopeModal.style.display = "none";
    openLetter();
  }, 760);
});

// ===== Letter typing + scroll hint =====
function openLetter() {
  letterModal.style.display = "grid";
  letterTitle.textContent = `A note for ${personName} 💌`;
  letterHeadText.textContent = `To ${personName}, my favorite feeling ✨`;
  typedLetter.innerHTML = "";
  scrollHint.classList.remove("show");

  // Reset scroll position to top
  const sheet = getLetterSheet();
  if (sheet) sheet.scrollTop = 0;

  typeLetter(getLetterText(), updateScrollHint);
  updateScrollHint();

  if (sheet) sheet.addEventListener("scroll", updateScrollHint, { passive: true });
}

closeLetterBtn.addEventListener("click", () => {
  letterModal.style.display = "none";
  message.textContent = `Ufff ${personName} 😌💖 I knew you’d say yes. Don’t act innocent now.`;
  gifCaption.textContent = "We’re officially a cute story now 💞";
});

function getLetterText() {
  return `My dearest ${personName},

Somehow you became my favorite part of the day.
Your name feels warm in my mind,
and your smile makes my heart act silly.

So here’s my honest truth:
I like you… a lot.
In the “I’ll choose you again tomorrow”
and “I’m proud of you even on hard days” kind of way.

Thank you for being you.
Happy Valentine’s, ${personName}. 💖

Yours,
(Your secret admirer) ❤️`;
}

function typeLetter(text, onTick) {
  let i = 0;
  const speed = 18;
  const cursor = `<span class="cursor">|</span>`;

  function tick() {
    i++;
    const shown = text.slice(0, i);
    typedLetter.innerHTML = shown.replace(/\n/g, "<br>") + cursor;

    if (typeof onTick === "function") onTick();

    if (i < text.length) setTimeout(tick, speed);
    else {
      typedLetter.innerHTML = shown.replace(/\n/g, "<br>");
      updateScrollHint();
    }
  }

  tick();
}

// ===== Floating hearts =====
const heartEmojis = ["💗","💖","💘","💝","💕","💞","❤️","🦋"];
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
  heart.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
  heart.style.fontSize = (14 + Math.random() * 22) + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}, 420);

function bigHeartsBurst(){
  for(let i=0;i<18;i++){
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = (4 + Math.random() * 4) + "s";
      heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      heart.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
      heart.style.fontSize = (14 + Math.random() * 22) + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 9000);
    }, i * 55);
  }
}

// ===== Confetti =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let confettiOn = false;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(){
  confettiOn = true;
  confettiPieces = Array.from({length: 180}, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.3,
    r: 4 + Math.random() * 6,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 5,
    rot: Math.random() * Math.PI,
    vr: -0.1 + Math.random() * 0.2
  }));
  requestAnimationFrame(drawConfetti);
  setTimeout(() => { confettiOn = false; }, 2800);
}

function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(!confettiOn && confettiPieces.length === 0) return;

  confettiPieces.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.vy += 0.04;

    const hue = (p.x / canvas.width) * 360;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = `hsl(${hue}, 85%, 60%)`;
    ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 30);
  requestAnimationFrame(drawConfetti);
}
