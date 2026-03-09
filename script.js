document.addEventListener("DOMContentLoaded", () => {
  // Initialize Animations
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    themeToggle.innerHTML =
      newTheme === "light"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
  });

  // Language Switcher
  const langBtn = document.getElementById("lang-switch");
  let currentLang = "id";

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "id" ? "en" : "id";
    langBtn.innerText = currentLang.toUpperCase();

    document.querySelectorAll("[data-id]").forEach((el) => {
      if (currentLang === "en" && el.dataset.en) {
        el.innerText = el.dataset.en;
      } else if (currentLang === "id" && el.dataset.id) {
        el.innerText = el.dataset.id;
      }
    });
  });

  // Navbar Scroll Effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
      navbar.style.padding = "20px 0";
      navbar.style.boxShadow = "none";
    }
  });

  // Animated Counters
  const counters = document.querySelectorAll(".count");
  const speed = 200;

  const startCounters = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Intersection Observer for Statistics
  const statsSection = document.querySelector(".stats-dashboard");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(statsSection);
      }
    },
    { threshold: 0.5 },
  );

  observer.observe(statsSection);

  // Chart.js Production Graph
  const ctx = document.getElementById("productionChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Production Index",
          data: [40, 55, 75, 85, 95],
          borderColor: "#c5a059",
          backgroundColor: "rgba(197, 160, 89, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true, grid: { display: false } },
        x: { grid: { display: false } },
      },
    },
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.");
    contactForm.reset();
  });
});
// =============================
// FORM KIRIM KE WHATSAPP
// =============================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector("input[type='text']").value;
  const email = this.querySelector("input[type='email']").value;
  const message = this.querySelector("textarea").value;

  const phoneNumber = "6281234567890"; // GANTI DENGAN NOMOR WA KAMU

  const waMessage =
    `Halo, saya ${name}%0A` + `Email: ${email}%0A` + `Pesan: ${message}`;

  window.open(`https://wa.me/${phoneNumber}?text=${waMessage}`, "_blank");
});
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

if (next && prev) {
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
}

// otomatis setiap 5 detik
setInterval(nextSlide, 5000);
// Toggle dropdown admin
const menuToggle = document.querySelector(".menu-toggle");
const dropdown = document.querySelector(".admin-dropdown");

menuToggle.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// Tutup jika klik di luar
document.addEventListener("click", function (e) {
  if (!menuToggle.contains(e.target)) {
    dropdown.style.display = "none";
  }
});
