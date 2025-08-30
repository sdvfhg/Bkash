const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const popup = document.getElementById("popup");
const prizeText = document.getElementById("prizeText");
const closeBtn = document.getElementById("closeBtn");

const prizes = ["রিচার্জ ৫০", "লাইট", "Cup IceCream", "মজো ২৫০ml", "রিচার্জ ২০", "স্পিড"];
const colors = ["#FFD700", "#FF4500", "#8A2BE2", "#FF69B4", "#1E90FF", "#32CD32"];

let angle = 0;
let spinning = false;

function drawWheel() {
  const arc = (2 * Math.PI) / prizes.length;
  for (let i = 0; i < prizes.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, arc * i + angle, arc * (i + 1) + angle);
    ctx.lineTo(200, 200);
    ctx.fill();

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(arc * i + arc / 2 + angle);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(prizes[i], 100, 10);
    ctx.restore();
  }
}

function spinWheel() {
  if (spinning) return;
  spinning = true;

  const spinTime = 4000;
  const finalAngle = angle + Math.random() * 360 + 720;

  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    angle += (finalAngle - angle) * 0.05; // easing
    ctx.clearRect(0, 0, 400, 400);
    drawWheel();

    if (progress < spinTime) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const arc = (2 * Math.PI) / prizes.length;

// Adjust by +90 degrees (π/2 radians) since the arrow is at TOP
let adjustedAngle = (angle + Math.PI / 2) % (2 * Math.PI);

const index = Math.floor(((2 * Math.PI) - adjustedAngle) / arc) % prizes.length;
showPrize(prizes[index]);

    }
  }
  requestAnimationFrame(animate);
}

function showPrize(prize) {
  prizeText.textContent = "You Won: " + prize + " 🎉";
  popup.style.display = "block";
}

spinBtn.addEventListener("click", spinWheel);
closeBtn.addEventListener("click", () => popup.style.display = "none");

drawWheel();

