document.addEventListener("DOMContentLoaded", function () {
  // --- Animación del encabezado ---
  // Agrega la clase 'animated' al encabezado tras 300ms para animarlo
  const headerContent = document.querySelector(".header-content");
  setTimeout(() => {
    headerContent.classList.add("animated");
  }, 300);

  // --- Observador para animar secciones al hacer scroll ---
  // Detecta cuando las secciones entran en vista (al menos 10%) y les agrega la clase 'visible'
  const observerOptions = { threshold: 0.1 };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Si la sección es "funcionalidades", también anima su contenedor de beneficios
        if (entry.target.id === "funcionalidades") {
          const benefitsContainer = document.querySelector(".benefits");
          benefitsContainer?.classList.add("animated");
        }
      }
    });
  }, observerOptions);

  // Observa todas las secciones del documento
  document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section);
  });

  // --- Observador para animar el footer ---
  // Agrega la clase 'animated' al footer cuando entra al 20% de visibilidad
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.2 }
  );

  const footer = document.querySelector("footer");
  if (footer) footerObserver.observe(footer);

  // --- Navegación con scroll suave y activación de enlaces ---
  // Al hacer clic en un enlace de navegación, se realiza scroll suave y se activa el enlace correspondiente
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajuste por altura de la barra de navegación
          behavior: "smooth",
        });

        // Marca como activo solo el enlace actual
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // --- Detectar scroll y marcar el enlace activo automáticamente ---
  // Durante el desplazamiento, activa el enlace del menú correspondiente a la sección visible
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // --- Efecto hover para botones .btn ---
  // Al pasar el mouse sobre un botón, se aplica una animación de elevación
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });
});
