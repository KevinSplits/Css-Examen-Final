// Referencias a los elementos
const toggleSidebar = document.getElementById('cambiar-estilos');
const closeSidebar = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar');

// Abrir y cerrar sidebar
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('translate-x-full');
});
closeSidebar.addEventListener('click', () => {
    sidebar.classList.add('translate-x-full');
});

// Cambiar tamaño de fuente
const fontSizeInput = document.getElementById('font-size');
const applyFontSizeButton = document.getElementById('apply-font-size');
applyFontSizeButton.addEventListener('click', () => {
    let newSize = parseInt(fontSizeInput.value, 10);

    // Validar límites de tamaño de fuente
    if (newSize < 12 || newSize > 24 || isNaN(newSize)) {
        alert("El tamaño de fuente debe estar entre 12 y 24.");
        return;
    }

    // Aplicar tamaño de fuente
    const content = document.querySelectorAll(
        'body *:not(nav):not(footer):not(#sidebar)'
    );
    content.forEach((element) => {
        element.style.fontSize = `${newSize}px`;
    });
});

// Activar negrita
const boldButton = document.getElementById('bold-button');
boldButton.addEventListener('click', () => {
    document.body.style.fontWeight = document.body.style.fontWeight === 'bold' ? 'normal' : 'bold';
});

// Activar cursiva
const italicButton = document.getElementById('italic-button');
italicButton.addEventListener('click', () => {
    document.body.style.fontStyle = document.body.style.fontStyle === 'italic' ? 'normal' : 'italic';
});

// Activar modo oscuro
const darkModeButton = document.getElementById('dark-mode');
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('bg-gray-100');
    document.body.classList.toggle('text-gray-900');
    document.body.classList.toggle('bg-gray-900');
    document.body.classList.toggle('text-white');
});


//Modal Video

document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos
    const openModalButton = document.getElementById("open-modal");
    const modal = document.getElementById("modal");
    const closeModalButton = document.getElementById("close-modal");

    // Mostrar modal
    openModalButton.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModalButton.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Prevenir que el modal se cierre si se hace clic en el fondo
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            // Si se hace clic fuera del modal (en el fondo), se cierra
            modal.classList.add("hidden");
        }
    });
});

//STATS

// Función para formatear el número con sufijos
function formatNumber(value) {
    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(0) + ' billones';
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(0) + ' millones';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + ' mil';
    }

    if (value < 1000 && value > 5) {
        return value + "%";    
    }

    return value; // Si el número es menor que 5
}

// Función para animar el contador hacia el número objetivo
function animateCounter(elementId, targetValue) {
    let element = document.getElementById(elementId);
    let currentValue = 0;
    let interval = 100; // Velocidad de la animación (milisegundos)
    let increment = targetValue / 100; // Dividimos el valor por 15 para incrementar poco a poco

    let counter = setInterval(function() {
        currentValue += increment;
        element.innerText = formatNumber(Math.floor(currentValue)); // Aplicamos formato con sufijos

        // Detener la animación cuando lleguemos al valor final
        if (currentValue >= targetValue) {
            clearInterval(counter);
            element.innerText = formatNumber(targetValue); // Aseguramos que el número final se vea correctamente
        }
    }, interval);
}

// Ejecutamos las animaciones cuando la página esté cargada
window.onload = function() {
    // Definimos los valores para cada métrica y la animación
    animateCounter('usuarios-activos', 500000); // 500,000 usuarios activos
    animateCounter('tiempo-actividad', 75); // 99.9% de tiempo de actividad
    animateCounter('transacciones-diarias', 44000000); // 44 millones de transacciones diarias
};

//Testimonios

document.addEventListener("DOMContentLoaded", () => {
    const testimonios = document.querySelectorAll("#testimonios .testimonio");
    let currentGroup = 0; // El grupo de testimonios visible inicialmente

    const updateVisibleTestimonios = () => {
        // Ocultar todos los testimonios
        testimonios.forEach(testimonio => testimonio.classList.add('hidden'));

        // Mostrar los 3 testimonios correspondientes al grupo actual
        for (let i = currentGroup; i < currentGroup + 3 && i < testimonios.length; i++) {
            testimonios[i].classList.remove('hidden');
            testimonios[i].classList.add('active');
        }
    };

    // Función para mostrar el grupo anterior
    const showPreviousGroup = () => {
        if (currentGroup > 0) {
            currentGroup--;
        } else {
            currentGroup = testimonios.length - 3; // Si estamos en el primer grupo, ir al último
        }
        updateVisibleTestimonios();
    };

    // Función para mostrar el siguiente grupo
    const showNextGroup = () => {
        if (currentGroup < testimonios.length - 3) {
            currentGroup++;
        } else {
            currentGroup = 0; // Si estamos en el último grupo, ir al primero
        }
        updateVisibleTestimonios();
    };

    // Inicializa los testimonios visibles
    updateVisibleTestimonios();

    // Eventos de los botones
    document.getElementById("prev").addEventListener("click", showPreviousGroup);
    document.getElementById("next").addEventListener("click", showNextGroup);
});

//Formulario

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del formulario
    const form = document.querySelector('form');
    const progressBar = document.getElementById('progress');
    const submitButton = form.querySelector('button[type="submit"]');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const interest = document.getElementById('interest');
    const contactRadios = document.querySelectorAll('input[name="contact"]');
    const message = document.getElementById('message');
    const termsCheckbox = document.getElementById('terms');
  
    // Función para actualizar el progreso
    function updateProgress() {
      let completedFields = 0;
  
      // Recuento de campos completados
      if (firstName.value) completedFields++;
      if (lastName.value) completedFields++;
      if (email.value) completedFields++;
      if (interest.value) completedFields++;
      if (Array.from(contactRadios).some(radio => radio.checked)) completedFields++;
      if (message.value) completedFields++;
      if (termsCheckbox.checked) completedFields++;
  
      // Calcular porcentaje de progreso
      const totalFields = 7; // Total de campos requeridos
      const progress = (completedFields / totalFields) * 100;
  
      // Actualizar barra de progreso y texto
      progressBar.value = progress;
      progressBar.nextElementSibling.textContent = `${Math.round(progress)}% completado`;
  
      // Habilitar o deshabilitar el botón Enviar
      if (completedFields === totalFields) {
        submitButton.disabled = false;
        submitButton.classList.remove('bg-indigo-300');
        submitButton.classList.add('bg-indigo-600');
      } else {
        submitButton.disabled = true;
        submitButton.classList.add('bg-indigo-300');
        submitButton.classList.remove('bg-indigo-600');
      }
    }
  
    // Escuchar cambios en los campos del formulario
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
  
    // Llamar a updateProgress al cargar la página para verificar el estado inicial
    updateProgress();
  });
  
//Nosotros: Album de Imagenes

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#gallery');
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const items = carousel.querySelectorAll('[data-carousel-item]');
    let currentIndex = 0;
    const intervalTime = 3000;  // Intervalo de tiempo en milisegundos (3 segundos)
    let interval;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.add('hidden');
            if (index === currentIndex) {
                item.classList.remove('hidden');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        updateCarousel();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
        resetInterval();
    });

    // Función para iniciar el carrusel automático
    function startAutoSlide() {
        interval = setInterval(() => {
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, intervalTime);
    }

    // Detener el carrusel automático y reiniciar
    function resetInterval() {
        clearInterval(interval);
        startAutoSlide();
    }

    // Inicialización
    updateCarousel();
    startAutoSlide();
});

    // Selección de elementos
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Alternar la visibilidad del menú al hacer clic
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });



