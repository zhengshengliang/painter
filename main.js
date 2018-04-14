let canvas = '';
let context = '';

class Painter {
    constructor() {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
    }

    init() {
        const pageWidth = document.documentElement.clientWidth;
        const pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;

        this.listenMouseEvent();
    }

    drawLine(x1, y1, x2 = 100, y2 = 100) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.moveTo(x1, y1);
        context.lineWidth = 5;
        context.moveTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    listenMouseEvent() {
        canvas.onmousedown = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            this.drawLine(x, y);
        }

        canvas.onmousemove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
        }
    }
}

const painter = new Painter();
painter.init();
