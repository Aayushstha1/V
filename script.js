// ===== Grab elements (ONLY ONCE) =====
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const message = document.getElementById("message");
const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const nameModal = document.getElementById("nameModal");
const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");

let personName = "Cutie";
let noClicks = 0;

// If any of these are null, your HTML ids don't match.
console.log({ title, subtitle, message, gif, yesBtn, noBtn, nameModal, nameInput, startBtn });

// ===== Modal open on load =====
window.addEventListener("load", () => {
  // show modal (in case you changed CSS)
  nameModal.style.display = "grid";
  setTimeout(() => nameInput.focus(), 50);
});

// ===== Start with name =====
function startWithName() {
  const raw = (nameInput.value || "").trim();
  personName = raw ? raw : "Cutie";

  title.textContent = `${personName}, will you be my Valentine? 💖`;
  subtitle.textContent = `Only one correct answer, ${personName} 😌`;
  message.textContent = "Click one… choose wisely 😏";

  nameModal.style.display = "none";
}

// Button click
startBtn.addEventListener("click", startWithName);

// Enter key
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startWithName();
});


// ===== No/Yes logic =====
const noLines = [
  "Are you sure you didn't want to be my valentine? 🥺",
  "Think properly 😤💗",
  "Okay… last chance 😭",
  "Please be my valentine 😔💘",
  "I’m not giving up 😌💕",
  "No button is getting tired... 😵‍💫"
];

function setButtonSizes() {
  const yesScale = 1 + noClicks * 0.15;
  const noScale = Math.max(0.35, 1 - noClicks * 0.12);

  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.transform = `scale(${noScale})`;

  yesBtn.style.fontSize = `${16 + noClicks * 2}px`;
  noBtn.style.fontSize = `${16 - Math.min(8, noClicks * 1)}px`;

  if (noClicks >= 4) noBtn.style.opacity = "0.75";
  if (noClicks >= 6) noBtn.style.opacity = "0.55";
}

noBtn.addEventListener("click", () => {
  noClicks++;

  const line = noLines[Math.min(noClicks - 1, noLines.length - 1)];
  message.textContent = line;

  setButtonSizes();

  if (noClicks === 2) {
    gif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGx1dGxqZ2c2Z2R5bTVpZnF4dmt3aWc5N3ZqNTR0aGd0eWZ4cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oriO0OEd9QIDdllqo/giphy.gif";
  }
  if (noClicks === 4) {
    gif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHF0a2Z2dHc2Y2NubG4wOWd6eTFxZWZlZ3R5NGdteHptY3l4MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l4FGpP4lxGGgK5CBW/giphy.gif";
  }

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

yesBtn.addEventListener("click", () => {
  title.textContent = "YAYYYY!! 💞";
  message.textContent = `ufff ${personName} 😌💖 i know u love me. don't act like a fool`;
  gif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2VnOGN5N3ZrbG03YmNwcWJ3Z2lhcTQ4eGozdnp0bWZ4Z2VtNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif";

  yesBtn.disabled = true;
  noBtn.disabled = true;
  noBtn.style.opacity = "0.4";

  launchConfetti();
  bigHeartsBurst();
});


// ===== Floating hearts =====
const heartEmojis = ["💗","💖","💘","💝","💕","💞","❤️"];
function spawnHeart() {
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
}
setInterval(spawnHeart, 450);


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

function bigHeartsBurst(){
  for(let i=0;i<18;i++){
    setTimeout(spawnHeart, i*60);
  }
}
