window.addEventListener('load', function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true,  // Habilitar el bucle de imágenes
        slidesPerView: 5,  // Mostrar 3 imágenes a la vez
        spaceBetween: 30,  // Separación entre imágenes (en píxeles)
        slidesPerGroup: 1,  // Deslizar una imagen por vez
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
})