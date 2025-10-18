document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const audio = document.getElementById("takbiran");
  const audioBtn = document.getElementById("audio-btn");
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let isPlaying = false;
  let audioContext;
  let analyser;
  let dataArray;
  let animationId;

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Audio control with visualization
  audioBtn.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      audioBtn.innerHTML = '<i class="fas fa-music"></i>';
      if (analyser) {
        cancelAnimationFrame(animationId);
      }
    } else {
      // Initialize audio context if not already done
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }

      audio
        .play()
        .then(() => {
          audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
          animateAudio();
        })
        .catch((error) => {
          console.error("Audio playback failed:", error);
          audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          audioBtn.title = "Gagal memutar audio. Klik untuk mencoba lagi.";
        });
    }
    isPlaying = !isPlaying;
  });

  // Audio visualization
  function animateAudio() {
    if (!isPlaying) return;

    animationId = requestAnimationFrame(animateAudio);
    analyser.getByteFrequencyData(dataArray);

    // Update audio wave animation
    const waveBars = document.querySelectorAll(".audio-wave span");
    for (let i = 0; i < waveBars.length; i++) {
      const value = dataArray[i] / 255;
      waveBars[i].style.height = `${10 + value * 20}px`;
    }
  }

  // Scroll animations
  const sections = document.querySelectorAll(
    ".content-section, .footer, .gallery-section"
  );
  const fireworks = document.querySelector(".fireworks");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  function checkScroll() {
    // Section animations
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("visible");
      }
    });

    // Fireworks animation
    const animationSection = document.querySelector(".animation-section");
    if (animationSection) {
      const animationSectionTop = animationSection.getBoundingClientRect().top;

      if (animationSectionTop < window.innerHeight * 0.5) {
        fireworks.classList.add("visible");
      } else {
        fireworks.classList.remove("visible");
      }
    }

    // Hide scroll indicator when scrolling down
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = "0";
    } else {
      scrollIndicator.style.opacity = "1";
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Run once on load

  // Scroll to content when clicking indicator
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // Create floating elements
  function createFloatingElements() {
    const floatingKetupat = document.querySelector(".floating-ketupat");
    const floatingDates = document.querySelector(".floating-dates");
    const arabicDates = [
      "١",
      "٢",
      "٣",
      "٤",
      "٥",
      "١٤٤٥",
      "ه‍",
      "عِيد",
      "فِطْر",
    ];

    // Create ketupat elements
    if (floatingKetupat) {
      for (let i = 0; i < 15; i++) {
        const ketupat = document.createElement("div");
        ketupat.className = "ketupat";

        // Random position and animation
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 20 + Math.random() * 30;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 15;
        const opacity = 0.3 + Math.random() * 0.7;

        ketupat.style.left = `${left}%`;
        ketupat.style.top = `${top}%`;
        ketupat.style.width = `${size}px`;
        ketupat.style.height = `${size}px`;
        ketupat.style.animationDuration = `${duration}s`;
        ketupat.style.animationDelay = `${delay}s`;
        ketupat.style.opacity = opacity;

        floatingKetupat.appendChild(ketupat);
      }
    }

    // Create arabic date elements
    if (floatingDates) {
      for (let i = 0; i < 10; i++) {
        const date = document.createElement("div");
        date.className = "date";
        date.textContent =
          arabicDates[Math.floor(Math.random() * arabicDates.length)];

        // Random position and animation
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 0.8 + Math.random() * 1.5;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 20;
        const opacity = 0.1 + Math.random() * 0.3;

        date.style.left = `${left}%`;
        date.style.top = `${top}%`;
        date.style.fontSize = `${size}rem`;
        date.style.animationDuration = `${duration}s`;
        date.style.animationDelay = `${delay}s`;
        date.style.opacity = opacity;

        floatingDates.appendChild(date);
      }
    }
  }

  createFloatingElements();

  // Confetti effect
  const confettiParticles = [];
  const particleColors = [
    "#FFD700",
    "#E74C3C",
    "#3498DB",
    "#2ECC71",
    "#9B59B6",
    "#F1C40F",
  ];

  function ConfettiParticle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 5;
    this.color =
      particleColors[Math.floor(Math.random() * particleColors.length)];
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
    };
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 20;
    this.shape = Math.random() > 0.5 ? "circle" : "rect";

    this.update = function () {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.velocity.y += 0.1; // Gravity
      this.rotation += this.rotationSpeed;

      // Draw particle
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;

      if (this.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }

      ctx.restore();
    };
  }

  function createConfetti() {
    for (let i = 0; i < 50; i++) {
      confettiParticles.push(
        new ConfettiParticle(canvas.width / 2, canvas.height / 2)
      );
    }
  }

  function animateConfetti() {
    requestAnimationFrame(animateConfetti);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < confettiParticles.length; i++) {
      confettiParticles[i].update();

      // Remove particles that are out of view
      if (
        confettiParticles[i].y > canvas.height ||
        confettiParticles[i].x < 0 ||
        confettiParticles[i].x > canvas.width
      ) {
        confettiParticles.splice(i, 1);
        i--;
      }
    }

    // Add new particles occasionally
    if (Math.random() < 0.05) {
      confettiParticles.push(
        new ConfettiParticle(Math.random() * canvas.width, -10)
      );
    }
  }

  // Start confetti animation
  createConfetti();
  animateConfetti();

  // Trigger confetti on click
  canvas.addEventListener("click", function (e) {
    for (let i = 0; i < 30; i++) {
      confettiParticles.push(new ConfettiParticle(e.clientX, e.clientY));
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const audio = document.getElementById("takbiran");
  const audioBtn = document.getElementById("audio-btn");
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let isPlaying = false;
  let audioContext;
  let analyser;
  let dataArray;
  let animationId;

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Audio control with visualization
  audioBtn.addEventListener("click", async function () {
    try {
      if (isPlaying) {
        // Pause audio
        audio.pause();
        audioBtn.innerHTML = '<i class="fas fa-music"></i>';
        if (analyser) {
          cancelAnimationFrame(animationId);
        }
      } else {
        // Resume audio context if suspended
        if (audioContext && audioContext.state === "suspended") {
          await audioContext.resume();
        }

        // Initialize audio context if not already done
        if (!audioContext) {
          audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          analyser.fftSize = 64;
          dataArray = new Uint8Array(analyser.frequencyBinCount);
        }

        // Play audio
        await audio.play();
        audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
        animateAudio();
      }
      isPlaying = !isPlaying;
    } catch (error) {
      console.error("Error with audio:", error);
      audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      audioBtn.title = "Gagal memutar audio. Klik untuk mencoba lagi.";

      // Show alert to user if interaction was needed
      if (error.name === "NotAllowedError") {
        alert(
          "Mohon klik tombol audio sekali lagi untuk mengizinkan pemutaran suara"
        );
      }
    }
  });

  // Audio visualization
  function animateAudio() {
    if (!isPlaying) return;

    animationId = requestAnimationFrame(animateAudio);
    analyser.getByteFrequencyData(dataArray);

    // Update audio wave animation
    const waveBars = document.querySelectorAll(".audio-wave span");
    for (let i = 0; i < waveBars.length; i++) {
      const value = dataArray[i] / 255;
      waveBars[i].style.height = `${10 + value * 20}px`;
    }
  }

  // ... (kode lainnya tetap sama)
});
