document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de detalles
    const detailButtons = document.querySelectorAll('.project-details-btn');
    
    // Añadir event listeners a cada botón
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Encontrar el contenedor de detalles asociado a este botón
            const detailsContainer = this.nextElementSibling;
            
            // Comprobar si ya está activo
            const isActive = detailsContainer.classList.contains('active');
            
            // Actualizar el texto del botón según el estado
            if (isActive) {
                this.textContent = 'Ver más detalles ✨';
                detailsContainer.classList.remove('active');
            } else {
                this.textContent = 'Ocultar detalles 🙈';
                detailsContainer.classList.add('active');
            }
        });
    });
});
