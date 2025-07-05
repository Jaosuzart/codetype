// --- SCRIPT DO MENU MOBILE (Existente) ---
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const menuOverlay = document.getElementById("menu-overlay");
const closeMenuBtn = document.getElementById("close-menu");

function openMenu() {
  menuToggle.classList.add("active");
  navMenu.classList.add("active");
  menuOverlay.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  menuToggle.classList.remove("active");
  navMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", openMenu);
menuOverlay.addEventListener("click", closeMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      closeMenu();
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    closeMenu();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("testimonial-carousel");
  if (!carousel) return;

  const wrapper = carousel.querySelector("[data-carousel-wrapper]");
  const items = carousel.querySelectorAll("[data-carousel-item]");
  const btnPrev = carousel.querySelector(".carousel__btn--prev");
  const btnNext = carousel.querySelector(".carousel__btn--next");
  const indicators = carousel.querySelectorAll(".carousel-indicators button");

  let currentIndex = 0;
  const totalItems = items.length;
  let intervalId = null;
  const autoPlayDelay = 5000;

  function showSlide(index) {
    if (index < 0) {
      index = totalItems - 1;
    }
    if (index >= totalItems) {
      index = 0;
    }

    wrapper.style.transform = `translateX(-${index * 100}%)`;

    indicators.forEach((btn, i) => {
      const selected = i === index;
      btn.setAttribute("aria-selected", selected);
      btn.tabIndex = selected ? 0 : -1;
    });

    currentIndex = index;
  }

  function startAutoplay() {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      showSlide(currentIndex + 1);
    }, autoPlayDelay);
  }

  function resetAutoplay() {
    clearInterval(intervalId);
    startAutoplay();
  }

  btnPrev.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    resetAutoplay();
  });

  btnNext.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    resetAutoplay();
  });

  indicators.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      showSlide(i);
      resetAutoplay();
    });
  });

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      btnPrev.click();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      btnNext.click();
    }
  });

  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  carousel.addEventListener("mouseleave", () => {
    startAutoplay();
  });

  showSlide(0);
  startAutoplay();
});
