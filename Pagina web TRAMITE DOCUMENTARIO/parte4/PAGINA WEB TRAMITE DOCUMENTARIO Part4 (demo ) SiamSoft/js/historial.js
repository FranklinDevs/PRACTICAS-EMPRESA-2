document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel
    initCarousel();
    
    // Efectos de hover para las tarjetas de timeline
    initTimelineHoverEffects();
    
    // Efectos de hover para los elementos de la lista de beneficios
    initBenefitsHoverEffects();
    
    // Animación de la línea de tiempo
    animateTimeline();
});

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let intervalId = null;
    const intervalDuration = 5000; // 5 segundos
    
    // Función para mostrar el slide actual
    function showSlide(index) {
        // Ocultar todos los slides
        items.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-hidden', 'true');
        });
        
        // Desactivar todos los indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Mostrar el slide actual
        items[index].classList.add('active');
        items[index].setAttribute('aria-hidden', 'false');
        
        // Activar el indicador correspondiente
        indicators[index].classList.add('active');
        
        // Actualizar el índice actual
        currentIndex = index;
        
        // Reiniciar el temporizador automático
        resetInterval();
    }
    
    // Función para avanzar al siguiente slide
    function nextSlide() {
        const newIndex = (currentIndex + 1) % items.length;
        showSlide(newIndex);
    }
    
    // Función para retroceder al slide anterior
    function prevSlide() {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(newIndex);
    }
    
    // Función para iniciar el intervalo automático
    function startInterval() {
        intervalId = setInterval(nextSlide, intervalDuration);
    }
    
    // Función para reiniciar el intervalo automático
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }
    
    // Event listeners para los botones de navegación
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Navegación con teclado
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Pausar el carrusel cuando el mouse está sobre él
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    // Reanudar el carrusel cuando el mouse sale
    carousel.addEventListener('mouseleave', () => {
        startInterval();
    });
    
    // Iniciar el carrusel
    showSlide(0);
    startInterval();
}

function initTimelineHoverEffects() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
}

function initBenefitsHoverEffects() {
    const benefitsItems = document.querySelectorAll('.benefits-list li');
    
    benefitsItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
            item.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Configuración del Intersection Observer para animar elementos cuando son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Aplicar estilos iniciales y observar cada elemento
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}