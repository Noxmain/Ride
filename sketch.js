let icons = {};
let elements = [];
let speed = 1;

function preload() {
    icons.menu = loadImage("img/menu.png");
    icons.over = loadImage("img/over.png");
    icons.background = loadImage("img/background.png");

    icons.player = loadImage("img/rocket.png");
    icons.planets = [
        loadImage("img/planet0.png"),
        loadImage("img/planet1.png"),
        loadImage("img/planet2.png"),
        loadImage("img/planet3.png"),
        loadImage("img/planet4.png"),
        loadImage("img/planet5.png"),
        loadImage("img/planet6.png"),
    ];
    icons.ufo = loadImage("img/ufo.png");
    icons.coin = loadImage("img/coin.png");
    icons.shield = loadImage("img/shield.png");
    icons.slowmotion = loadImage("img/slowmotion.png");
}

function setup() {
    let c = createCanvas(450, 600);
    c.canvas.addEventListener("contextmenu", e => e.preventDefault());
    c.canvas.style.marginTop = ((window.innerHeight - height) / 2.5) + "px";
    // put setup code here
    elements[0] = new Planet(100, 20);
}

function update() {
    elements[0].update()
}

function draw() {
    update();

    background(bcolor);
    // put drawing code here
    elements[0].draw()
}
