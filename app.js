const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [],
    titleElement = null,
    titleBounds = null,
    title = null;
const numberOfparticlesArray = 50;

// measure title element
titleElement = document.getElementById("title1");

function getBounding() {
    titleBounds = titleElement.getBoundingClientRect();
    title = {
        x: titleBounds.left,
        y: titleBounds.top,
        width: titleBounds.width,
        height: 10,
    };
}

getBounding();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 14 + 2;
        this.weight = Math.random() * 1 + 1;
        if (this.x < canvas.width / 2.5) {
            // ltr
            this.directionX = 2;
        } else if (this.x > canvas.width - canvas.width / 2.5) {
            // rtl
            this.directionX = -2;
        } else {
            // center, random direction
            this.directionX = Math.random() > 0.5 ? 2 : -2;
        }
    }

    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width * 1.3;
        }
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;

        // collision check
        if (
            this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.y -= 3;
            this.weight *= -0.5;
        }
    }

    draw() {
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function animate() {
    ctx.fillStyle = " rgba(255,255,255, 0.01)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((p) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

function createParticles() {
    particlesArray = [];
    let i, x, y;
    for (i = 0; i < numberOfparticlesArray; i++) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}
createParticles();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    getBounding();
    createParticles();
});
