class CircularProgressBar {
    constructor(containerId, radius = 100, strokeWidth = 10) {
        this.width = radius * 2 + strokeWidth;
        this.height = this.width;
        this.radius = radius;
        this.strokeWidth = strokeWidth;
        this.progress = 0;

        // Inicializar el escenario y la capa
        this.stage = new Konva.Stage({
            container: containerId,
            width: this.width,
            height: this.height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        // Crear fondo de la barra de progreso
        this.backgroundCircle = new Konva.Circle({
            x: this.width / 2,
            y: this.height / 2,
            radius: this.radius,
            fill: '#e0e0e0', // Color de fondo
        });
        this.layer.add(this.backgroundCircle);

        // Crear el arco de la barra de progreso
        this.progressArc = new Konva.Arc({
            x: this.width / 2,
            y: this.height / 2,
            innerRadius: this.radius - this.strokeWidth,
            outerRadius: this.radius,
            angle: 0, // Inicia en 0 grados
            fill: '#76c7c0', // Color de la barra de progreso
            strokeWidth: 2,
        });
        this.layer.add(this.progressArc);

        // Iniciar el temporizador para actualizar la barra de progreso
        this.interval = setInterval(() => this.updateProgress(), 10);
        this.layer.draw();
    }
    updateProgress() {
        this.progress += 1; // Incrementar el progreso
        this.progressArc.angle(this.progress * 3.6); // Convertir el progreso a grados (360 / 100)

        this.layer.batchDraw();

        if (this.progress >= 100) {
            this.stop();
        }
    }
    stop() {
        clearInterval(this.interval);
    }
}

function loading() {
    let main = document.getElementById('main-wrapper');
    main.style.display = 'none';
    const loadingContainer = document.getElementById('loading-container');
    const progressBar = new CircularProgressBar('loading-container', 100, 10);
}

function loaded() {
    let main = document.getElementById('main-wrapper');
    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.remove();
    main.style.display = 'block';
}

window.addEventListener('load', function () {

    loading();

    setTimeout(() => loaded(), 2000);

    const swiper = new Swiper('.swiper-container', {
        loop: true,  
        slidesPerView: 5,  
        spaceBetween: 30,
        slidesPerGroup: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

