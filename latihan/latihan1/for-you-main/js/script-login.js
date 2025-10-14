// script-login.js

// Tambahkan animasi pada form saat di-load
document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".card");
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(-30px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100);
  }
});
