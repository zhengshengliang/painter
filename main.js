let canvas = '';
let context = '';
let isPaint = true;
let isEraser = false;
let isUsing = false;
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
        this.listenUesr();

        eraser.onclick = () => {
            isEraser = true;
            isPaint = false
        }

        pen.onclick = () => {
            isEraser = false;
            isPaint = true
        }

        // this.drawLine(0, 0, 100, 100);
    }

    listenUesr() {
        if ('ontouchstart' in document.body) {
            // 说明是触屏设备
            this.listenTouchEvent();
        } else  {
            this.listenMouseEvent();
        }
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

            isUsing = true;

            // if (isEraser) {
            //     isPaint = false;
            // } else {
            //     isPaint = true;
            // }

            // if (isEraser && !isPaint) {
            //
            // } else if (isPaint && !isEraser) {
            //     debugger;
            //     this.drawLine(x, y, 1);
            // }

            // const div = document.createElement('div');
            // div.style = 'position: absolute; left:' + (x - 3) + 'px; top:' + (y - 3) + 'px;' +
            //     'width: 6px; height: 6px; background: black; border-radius: 3px';
            // canvas.appendChild(div);
            // this.drawCircle(x, y, 1);
        }

        canvas.onmousemove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            if (isUsing) {
                if (isPaint) {
                    this.drawLine(lastPoint.x, lastPoint.y, x, y)
                } else if (isEraser){
                    context.clearRect(x -5, y - 5, 10, 10);
                }
            }

            lastPoint = {x, y};

            // const div = document.createElement('div');
            // div.style = 'position: absolute; left:' + (x - 3) + 'px; top:' + (y - 3) + 'px;' +
            //     'width: 6px; height: 6px; background: black; border-radius: 3px';
            // canvas.appendChild(div);
        }

        canvas.onmouseup = (e) => {
            // isPaint = false;
            const x = e.clientX;
            const y = e.clientY;
            isUsing = false;
        }

        window.onresize = () => {
            this.resize();
        }
    }

    listenTouchEvent() {
        canvas.ontouchstart = (e) => {
            const x = e.touches[0].clientX; // 这个相对于viewport的位置
            const y = e.touches[0].clientY;

            isUsing = true;
        }

        canvas.ontouchmove = (e) => {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            if (isUsing) {
                if (isPaint) {
                    this.drawLine(lastPoint.x, lastPoint.y, x, y);
                    lastPoint = {x, y};
                } else if (isEraser){
                    context.clearRect(x -5, y - 5, 10, 10);
                }
            }
        }

        canvas.ontouchend = (e) => {
            isUsing = false;
            lastPoint = {x: undefined, y: undefined};
        }
    }

}

const painter = new Painter();
painter.init();
