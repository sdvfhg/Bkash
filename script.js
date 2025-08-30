const scriptURL = "https://script.google.com/macros/s/AKfycbxdD-8egOZoDkSOu76bZqQWOm9XC1vmwVAmE0dMSNA7zXfR3HMTgX4BsQhLNLZYeUpQ/exec"; // will provide steps

const form = document.getElementById("campaignForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);

  fetch(scriptURL, { method: "POST", body: data })
    .then(res => res.text())
    .then(text => {
    if (text.includes("DUPLICATE")) {
        msg.style.color = "red";
        msg.textContent = "⚠ Phone or NID already exists!";
    } else {
        msg.style.color = "green";
        msg.textContent = "✅ Submitted Successfully! Redirecting...";
        setTimeout(() => {
            window.location.href = "wheel.html"; // redirect after 1.5s
        }, 1500);
    }
    })
    .catch(err => {
      msg.textContent = "Error: " + err;
    });
});
