let canvas = '';
let context = '';
let isPaint = false;

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

        context.fillStyle = 'red';
        context.fillRect(0, 0, 100, 100); // 注意这个要写在style前面，否则style那个不会生效

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
            isPaint = true;
            const x = e.clientX;
            const y = e.clientY;
            const div = document.createElement('div');
            div.style = 'position: absolute; left:' + (x - 3) + 'px; top:' + (y - 3) + 'px;' +
                'width: 6px; height: 6px; background: black; border-radius: 3px';
            canvas.appendChild(div);
        }

        canvas.onmousemove = (e) => {
            if (isPaint) {
                const x = e.clientX;
                const y = e.clientY;

                const div = document.createElement('div');
                div.style = 'position: absolute; left:' + (x - 3) + 'px; top:' + (y - 3) + 'px;' +
                    'width: 6px; height: 6px; background: black; border-radius: 3px';
                canvas.appendChild(div);
            }

        }

        canvas.onmouseup = (e) => {
            isPaint = false;
            const x = e.clientX;
            const y = e.clientY;
        }
    }
}

const painter = new Painter();
painter.init();
