// Efek teks bergerak
document.addEventListener("DOMContentLoaded", function () {
  const text = document.querySelector(".moving-text");
  if (text) {
    text.style.animation = "moveText 5s linear infinite";
  }
});
