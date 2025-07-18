document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráficos
    initCharts();
    
    // Inicializar carrusel
    initCarousel();
    
    // Efectos de hover para las tarjetas
    initCardHoverEffects();
    
    // Manejo de botones de reporte
    initReportButtons();
});

function initCharts() {
    // Gráfico 1: Tiempos de procesamiento por área
    const ctx1 = document.getElementById('processingTimeChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Área Administrativa', 'Área Financiera', 'Área Legal', 'Recursos Humanos', 'Servicios Generales'],
            datasets: [{
                label: 'Tiempo promedio (horas)',
                data: [3.2, 5.7, 8.1, 4.5, 2.9],
                backgroundColor: [
                    'rgba(0, 179, 110, 0.7)',
                    'rgba(0, 61, 130, 0.7)',
                    'rgba(255, 107, 0, 0.7)',
                    'rgba(51, 51, 51, 0.7)',
                    'rgba(108, 117, 125, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 179, 110, 1)',
                    'rgba(0, 61, 130, 1)',
                    'rgba(255, 107, 0, 1)',
                    'rgba(51, 51, 51, 1)',
                    'rgba(108, 117, 125, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toFixed(1) + ' horas';
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico 2: Evolución mensual de documentos procesados
    const ctx2 = document.getElementById('monthlyTrendChart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Documentos procesados',
                data: [1250, 1900, 1700, 2100, 2400, 2300, 2600, 2450, 2800, 3000, 3200, 3500],
                fill: false,
                backgroundColor: 'rgba(0, 179, 110, 0.2)',
                borderColor: 'rgba(0, 179, 110, 1)',
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: 'rgba(0, 61, 130, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Documentos'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' documentos';
                        }
                    }
                }
            }
        }
    });
}

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

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.metric-card, .report-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
}

function initReportButtons() {
    const reportButtons = document.querySelectorAll('.report-button');
    
    reportButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Simular generación de reporte
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Reporte listo';
                setTimeout(() => {
                    button.innerHTML = 'Generar Reporte';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
}