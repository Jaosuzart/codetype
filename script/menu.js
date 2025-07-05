document.addEventListener("DOMContentLoaded", () => {
  // Body troca no-js -> js para controlar estilos
  document.body.classList.replace("no-js", "js");

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const menuOverlay = document.getElementById("menu-overlay");

  function toggleMenu() {
    const isActive = navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active", isActive);
    menuOverlay.classList.toggle("active", isActive);
    menuToggle.setAttribute("aria-expanded", isActive);
  }

  // Abrir/fechar menu clicando no hambúrguer
  menuToggle.addEventListener("click", toggleMenu);

  // Fechar menu clicando no overlay
  menuOverlay.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Fechar menu ao clicar em links internos do menu
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Fechar menu com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      toggleMenu();
      menuToggle.focus();
    }
  });

  // Fechar menu se redimensionar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Smooth scroll para links âncora
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
