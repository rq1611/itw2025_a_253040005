const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const carousel = document.getElementById("newsCarousel");

let index = 0;

/* SIDEBAR */
function toggleSidebar() {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

/* CAROUSEL */
function visibleCard() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function updateCarousel() {
  const cardWidth = carousel.children[0].offsetWidth + 20;
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
}

function nextNews() {
  const maxIndex = carousel.children.length - visibleCard();
  index = index >= maxIndex ? maxIndex : index + 1;
  updateCarousel();
}

function prevNews() {
  index = index <= 0 ? 0 : index - 1;
  updateCarousel();
}

setInterval(nextNews, 3000);

/* ALAT 3D */
document.querySelectorAll(".alat-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (rect.height / 2 - y) / 15;
    const rotateY = (x - rect.width / 2) / 15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

/* ===== LOADING AUTO HIDE ===== */
window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "none";
});

/* ===== DARK MODE TOGGLE ===== */
function toggleDark() {
  document.body.classList.toggle("dark");
}
  