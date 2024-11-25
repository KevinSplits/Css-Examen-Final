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



