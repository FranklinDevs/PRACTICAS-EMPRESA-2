document.addEventListener('DOMContentLoaded', function () {
    // --- Animación del encabezado ---
    const headerContent = document.querySelector('.header-content');
    setTimeout(() => {
        headerContent.classList.add('animated');
    }, 300);

    // --- Observador para animar secciones al hacer scroll ---
    const observerOptions = { threshold: 0.1 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animación especial para sección "funcionalidades"
                if (entry.target.id === 'funcionalidades') {
                    const benefitsContainer = document.querySelector('.benefits');
                    benefitsContainer?.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Observador para animar el footer ---
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.2 });

    const footer = document.querySelector('footer');
    if (footer) footerObserver.observe(footer);

    // --- Navegación con scroll suave y activación de enlaces ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Actualiza clase activa
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // --- Detectar scroll y marcar el enlace activo automáticamente ---
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // --- Efecto hover para botones .btn ---
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
