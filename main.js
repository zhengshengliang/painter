let canvas = '';
let context = '';
let isPaint = false;
let isEraser = false;
let lastPoint = {};


class Painter {
    constructor() {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
    }

    init() {
        // context.strokeStyle = 'yellow';
        // context.strokeRect(10, 10, 100, 100); // 描边
        //
        // context.fillStyle = 'red'; // 填充
        // context.fillRect(10, 10, 100, 100); // 注意这个要写在style前面，否则style那个不会生效
        //
        // context.clearRect(50, 50, 10, 10);

        // context.beginPath();
        // context.moveTo(200, 200);
        // context.lineTo(300, 300);
        // context.lineTo(200, 300);
        // context.fill(); // 颜色为最后的颜色 现在为红色

        // context.arc(150, 150, 20, 0, Math.PI / 2); // 圆心 20半径 从0度 - 90度
        // context.stroke(); // 描边
        // context.fill(); // 全填充

        this.resize();
        this.listenMouseEvent();

        // this.drawLine(0, 0, 100, 100);
    }

    resize() {
        const pageWidth = document.documentElement.clientWidth;
        const pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }

    drawCircle(x, y, r) {
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2); // 圆心 20半径 从0度 - 90度
        context.fill(); // 描边
    }

    drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.moveTo(x1, y1); // 起点
        context.lineWidth = 5; // 线的宽度
        context.lineTo(x2, y2); // 终点
        context.stroke();
        context.closePath();
    }

    listenMouseEvent() {
        canvas.onmousedown = (e) => {
            const x = e.clientX; // 这个相对于viewport的位置
            const y = e.clientY;
            if (isEraser && !isPaint) {

            } else if (isPaint && !isEraser) {
                debugger;
                this.drawLine(x, y, 1);
            }

            // const div = document.createElement('div');
            // div.style = 'position: absolute; left:' + (x - 3) + 'px; top:' + (y - 3) + 'px;' +
            //     'width: 6px; height: 6px; background: black; border-radius: 3px';
            // canvas.appendChild(div);
            // this.drawCircle(x, y, 1);
        }

        canvas.onmousemove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            if (isPaint) {
                this.drawLine(lastPoint.x, lastPoint.y, x, y)
            }

            lastPoint = {x, y};

            // const div = document.createElement('div');
            // div.style = 'position: absolute; left:' + (x - 3) + 'px; top:' + (y - 3) + 'px;' +
            //     'width: 6px; height: 6px; background: black; border-radius: 3px';
            // canvas.appendChild(div);
        }

        canvas.onmouseup = (e) => {
            isPaint = false;
            const x = e.clientX;
            const y = e.clientY;
        }

        window.onresize = () => {
            this.resize();
        }

        eraser.onclick = () => {
            isEraser = true;
            isPaint = false
        }

        pen.onclick = () => {
            isEraser = false;
            isPaint = true
        }
    }

}

const painter = new Painter();
painter.init();
