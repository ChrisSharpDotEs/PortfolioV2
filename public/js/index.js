class CircularProgressBar {
    constructor(containerId, radius = 100, strokeWidth = 10) {
        this.width = radius * 2 + strokeWidth;
        this.height = this.width;
        this.radius = radius;
        this.strokeWidth = strokeWidth;
        this.progress = 0;

        this.stage = new Konva.Stage({
            container: containerId,
            width: this.width,
            height: this.height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        this.backgroundCircle = new Konva.Circle({
            x: this.width / 2,
            y: this.height / 2,
            radius: this.radius,
            fill: '#fff',
        });
        this.layer.add(this.backgroundCircle);

        this.progressArc = new Konva.Arc({
            x: this.width / 2,
            y: this.height / 2,
            innerRadius: this.radius - this.strokeWidth,
            outerRadius: this.radius,
            angle: 0,
            fill: '#76c7c0',
            strokeWidth: 2,
        });
        this.progressText = new Konva.Text({
            x: 0,
            y: this.height / 2 - 15,
            width: this.width,
            align: 'center',
            text: 'loading...',
            fontSize: 30,
            fontFamily: 'Arial',
            fill: '#76c7c0'
        });
        this.layer.add(this.progressArc);
        this.layer.add(this.progressText);

        this.interval = setInterval(() => this.updateProgress(), 10);
        this.layer.draw();
    }
    updateProgress() {
        this.progress += 1;
        this.progressArc.angle(this.progress * 3.6);

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

    setTimeout(() => loaded(), 1500);

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

