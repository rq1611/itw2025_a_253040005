// Musik & Konfeti
document.getElementById("celebrateBtn")?.addEventListener("click", () => {
  const audio = document.getElementById("birthdaySong");
  if (audio) {
    audio.play();
    createFireworks();
    startParticleRain();
  }
});

// Sistem Partikel Advanced
function createFireworks() {
  const colors = ["#ff69b4", "#7b68ee", "#ffd700", "#00ff00"];

  for (let i = 0; i < 150; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: explode 1.5s ease-out;
      `;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1500);
  }
}

// Hujan Partikel
function startParticleRain() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.cssText = `
          position: fixed;
          font-size: 20px;
          left: ${Math.random() * 100}%;
          top: -50px;
          animation: fall 3s linear;
      `;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }, 300);
}

// Tambahkan keyframe CSS secara dinamis
const style = document.createElement("style");
style.textContent = `
  @keyframes explode {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(5); opacity: 0; }
  }
  @keyframes fall {
      to { transform: translateY(110vh) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Cek apakah pengguna sudah login
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("login.html")) {
    if (localStorage.getItem("isLoggedIn") === "true") {
      window.location.replace("index.html");
    }
  } else if (window.location.pathname.includes("index.html")) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.replace("login.html");
    }
  }
});

// Fungsi efek konfeti hati
function createHeartConfetti() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.cssText = `
          position: fixed;
          font-size: 24px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: fall 2s ease-in-out;
      `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

// Fungsi menampilkan notifikasi
function showNotification(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 8px;
    font-size: 16px;
    z-index: 1000;
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Login Page Effects
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!username || !password) {
      showError("Nama pengguna dan kata sandi harus diisi!");
      return;
    }

    if (username === "Putik" && password === "bunga putik") {
      localStorage.setItem("isLoggedIn", "true");
      createHeartConfetti();
      showNotification("Login berhasil! Selamat datang!");
      document.querySelector(".glow-button").innerText = "Memuat...";

      // Tampilkan efek loading sebelum pindah halaman
      document.body.innerHTML =
        "<div style='display:flex;justify-content:center;align-items:center;height:100vh;font-size:24px;'>Memuat...</div>";
      await new Promise((resolve) => setTimeout(resolve, 2000));

      window.location.replace("index.html");
      setTimeout(() => {
        location.reload();
      }, 500);
    } else {
      showError("Nama pengguna atau kata sandi salah!");
    }
  });
}

// Efek gagal login dengan getaran
function showError(message) {
  const inputs = document.querySelectorAll(".input-3d");
  if (inputs.length > 0) {
    inputs.forEach((input) => {
      input.classList.add("shake");
      setTimeout(() => {
        input.classList.remove("shake");
      }, 500);
    });
  }
  showNotification(message);
}

// Logout function
function logout() {
  localStorage.removeItem("isLoggedIn");
  showNotification("Anda telah logout.");
  window.location.replace("login.html");
  setTimeout(() => {
    location.reload();
  }, 500);
}

document.getElementById("celebrateBtn")?.addEventListener("click", () => {
  console.log("Tombol diklik, memulai perayaan...");
  const audio = document.getElementById("birthdaySong");
  if (audio) {
    audio.play();
    createFireworks();
    startParticleRain();
    console.log("Menampilkan notifikasi...");
    showNotification(
      "Perayaan dimulai! Selamat ulang tahun! 🎉 dan paketmu sedang kami siapkan mohon ditunggu🤗"
    );
  } else {
    console.log("Audio tidak ditemukan.");
  }
});

// Fungsi menampilkan notifikasi mengikuti scroll
function showNotification(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 8px;
    font-size: 16px;
    z-index: 1000;
    transition: top 0.2s ease-in-out;
  `;
  document.body.appendChild(notification);

  function updateNotificationPosition() {
    notification.style.top = `${window.scrollY + 20}px`;
  }

  window.addEventListener("scroll", updateNotificationPosition);
  updateNotificationPosition();

  setTimeout(() => {
    notification.remove();
    window.removeEventListener("scroll", updateNotificationPosition);
  }, 8000);
}

// Fungsi menampilkan gambar saat perayaan
function showCelebrationImage() {
  const image = document.createElement("img");
  image.src = "https://picsum.photos/400/300";
  image.alt = "Perayaan Ulang Tahun";
  image.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    animation: fadeIn 1s ease-in-out;
  `;
  document.body.appendChild(image);

  setTimeout(() => {
    image.style.animation = "fadeOut 1s ease-in-out";
    setTimeout(() => image.remove(), 1000);
  }, 6000);
}

// Fungsi menampilkan empat gambar
function showFourImages() {
  let existingContainer = document.getElementById("imageContainer");
  if (existingContainer) {
    existingContainer.remove();
  }

  const container = document.createElement("div");
  container.id = "imageContainer";
  container.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  for (let i = 0; i < 4; i++) {
    const imageBox = document.createElement("div");
    imageBox.style.textAlign = "center";

    const image = document.createElement("img");
    image.src = `https://picsum.photos/150/150?random=${i}`;
    image.alt = "Foto Perayaan";
    image.style.borderRadius = "10px";
    image.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";

    const caption = document.createElement("p");
    caption.innerText = `Foto ${i + 1}`;
    caption.style.color = "white";
    caption.style.fontSize = "14px";

    imageBox.appendChild(image);
    imageBox.appendChild(caption);
    container.appendChild(imageBox);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 6000);
}
