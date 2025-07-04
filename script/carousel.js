document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("testimonial-carousel");
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
    if (index < 0) index = totalItems - 1;
    if (index >= totalItems) index = 0;

    // Move wrapper
    wrapper.style.transform = `translateX(-${index * 100}%)`;

    // Atualiza indicador aria
    indicators.forEach((btn, i) => {
      const selected = i === index;
      btn.setAttribute("aria-selected", selected);
      btn.tabIndex = selected ? 0 : -1;
    });

    currentIndex = index;
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

  // Navegação via teclado
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      btnPrev.click();
    } else if (e.key === "ArrowRight") {
      btnNext.click();
    }
  });

  // Autoplay
  function startAutoplay() {
    intervalId = setInterval(() => {
      showSlide(currentIndex + 1);
    }, autoPlayDelay);
  }

  function resetAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    startAutoplay();
  }

  // Pausa autoplay ao passar mouse
  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  carousel.addEventListener("mouseleave", () => {
    startAutoplay();
  });

  // Inicializa
  showSlide(0);
  startAutoplay();
});
