class Circle {
    constructor(x, y, radius, color) {
        this.color = color;
        this.radius = radius;
        this.x = x;
        this.y = y;

        this.dx = getRandomSpeed();
        this.dy = getRandomSpeed();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        this.update();
    }

    update() {
        this.x += this.dx;
        if (this.x + this.radius + this.dx >= window.innerWidth / 2 || this.x - this.radius + this.dx <= (-window.innerWidth / 2)) {
            this.dx = -this.dx;
        }
        this.y += this.dy;
        if (this.y + this.radius + this.dy >= window.innerHeight / 2 || this.y - this.radius <= (-window.innerHeight / 2)) {
            this.dy = -this.dy * 0.85;
            this.dx *= 0.98;
        } else {
            this.dy = this.dy + 1;
        }
    }
}

let canvas = document.querySelector('canvas'),
    circlesS = [
        new Circle(-150, -150, 30, getRandomColor()),
        new Circle(-210, -145, 30, getRandomColor()),
        new Circle(-262, -130, 25, getRandomColor()),
        new Circle(-280, -85, 25, getRandomColor()),
        new Circle(-270, -32, 30, getRandomColor()),
        new Circle(-228, -5, 20, getRandomColor()),
        new Circle(-178, -5, 30, getRandomColor()),
        new Circle(-123, 0, 25, getRandomColor()),
        new Circle(-90, 30, 20, getRandomColor()),
        new Circle(-90, 80, 30, getRandomColor()),
        new Circle(-140, 120, 35, getRandomColor()),
        new Circle(-205, 120, 30, getRandomColor()),
        new Circle(-255, 120, 20, getRandomColor()),
        new Circle(-290, 106, 20, getRandomColor()),
        new Circle(-310, 80, 15, getRandomColor()),
    ],
    circlesK = [
        new Circle(0, -150, 25, getRandomColor()),
        new Circle(0, -95, 30, getRandomColor()),
        new Circle(0, -45, 20, getRandomColor()),
        new Circle(0, 5, 30, getRandomColor()),
        new Circle(0, 60, 25, getRandomColor()),
        new Circle(0, 120, 35, getRandomColor()),
        new Circle(0, 120, 35, getRandomColor()),
        new Circle(50, 5, 20, getRandomColor()),
        new Circle(83, -25, 25, getRandomColor()),
        new Circle(110, -60, 20, getRandomColor()),
        new Circle(140, -100, 30, getRandomColor()),
        new Circle(150, -150, 25, getRandomColor()),
        new Circle(75, 25, 15, getRandomColor()),
        new Circle(100, 55, 25, getRandomColor()),
        new Circle(125, 90, 20, getRandomColor()),
        new Circle(160, 125, 30, getRandomColor()),
    ],
    circlesI = [
        new Circle(280, -150, 25, getRandomColor()),
        new Circle(280, -95, 30, getRandomColor()),
        new Circle(280, -45, 20, getRandomColor()),
        new Circle(280, 5, 30, getRandomColor()),
        new Circle(280, 60, 25, getRandomColor()),
        new Circle(280, 120, 35, getRandomColor()),
        new Circle(280, 120, 35, getRandomColor()),
    ];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
ctx.translate(window.innerWidth / 2, window.innerHeight / 2);

function drawAll(ctx) {
    ctx.clearRect(-window.innerWidth / 2, -window.innerHeight / 2, window.innerWidth, window.innerHeight);
    circlesS.forEach(circle => {
        circle.draw(ctx);
    });
    circlesK.forEach(circle => {
        circle.draw(ctx);
    });
    circlesI.forEach(circle => {
        circle.draw(ctx);
    });
}

function getRandomColor() {
    let colors = [
        '#FFFFFF',
        '#E2A899',
        '#FF9515',
        '#5C1C1C',
        '#FFC075',
    ];

    let colorIndex = Math.round(Math.random() * 5);

    return colors[colorIndex];
}

function getRandomSpeed() {
    return Math.round(Math.random() * 24 - 12);
}

drawAll(ctx);
function animate() {
    requestAnimationFrame(animate);
    drawAll(ctx);
}

let started = false;
window.addEventListener('scroll', function () {
    if (!started) {
        animate();
        started = true;
    }
});

