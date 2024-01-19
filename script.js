let HITBOXES = false;

let player;
let elements;
let difficulty;
let current_speed;
let speed;
let slowmotion;
let background_y;
let planet_timer;
let planet_chance = 1 / 100;
let ufo_chance = 1 / 600;
let item_chance = 1 / 1000;
let menu = true;

let img = {};
function preload() {
    img.menu = loadImage("img/menu.png");
    img.over = loadImage("img/over.png");
    img.background = loadImage("img/background.png");

    img.player = loadImage("img/rocket.png");
    img.planets = [
        loadImage("img/planet0.png"),
        loadImage("img/planet1.png"),
        loadImage("img/planet2.png"),
        loadImage("img/planet3.png"),
        loadImage("img/planet4.png"),
        loadImage("img/planet5.png"),
        loadImage("img/planet6.png"),
    ];
    img.ufo = loadImage("img/ufo.png");
    img.coin = loadImage("img/coin.png");
    img.shield = loadImage("img/shield.png");
    img.slowmotion = loadImage("img/slowmotion.png");
}

function reset() {
    player = new Player();
    elements = [];
    current_speed = difficulty;
    slowmotion = 0;
    background_y = height - width * img.background.height / img.background.width;
    planet_timer = 0;
    menu = false;
    frameCount = 0;
    loop();
}

function setup() {
    let c = createCanvas(450, 600);
    c.mouseClicked(mouse);
    c.canvas.addEventListener("contextmenu", e => e.preventDefault());
    c.canvas.style.marginTop = ((window.innerHeight - height) / 2.5) + "px";
    stroke(255, 0, 0); strokeWeight(1); noFill(); noSmooth();
    textFont("monospace"); textSize(20);
    image(img.menu, 0, 0, width, height);
    noLoop();
}

function draw() {
    // speed
    if (frameCount % 1000 == 0) {current_speed *= 1.2;}
    slowmotion -= 1;
    speed = current_speed;
    if (slowmotion > 0) {speed /= 3;}
    // draw background
    background_y += speed / 2;
    if (background_y >= 0) {background_y = height - width * img.background.height / img.background.width;}
    image(img.background, 0, background_y, width, width / img.background.width * img.background.height);
    // create new planets
    planet_timer -= 1;
    if ((planet_timer <= 0) && (random() < planet_chance * speed)) {
        let r = random([20, 40, 80]);
        let new_planet = new Planet(random(width), r);
        if (!collide(new_planet, elements)) {elements.push(new_planet); planet_timer = r * 2 / speed;}
    }
    // create new ufos
    if (random() < ufo_chance * speed) {
        let new_ufo = new Ufo(...random([
            [random(width), -20], // top
            [-20, random(height / 2)], // left
            [width + 20, random(height / 2)], // right
        ]));
        if (!collide(new_ufo, elements)) {elements.push(new_ufo);}
    }
    // create new items
    if (random() < item_chance * speed) {
        let e = random(["coin", "coin", "coin", "shield", "shield", "slowmotion"]);
        let new_item = new Item(random(width), e);
        if (!collide(new_item, elements)) {elements.push(new_item);}
    }
    // update elements
    for (let element of elements) {
        element.update();
        element.draw();
    }
    // delete elements
    elements = elements.filter(x => x.visible());
    // update player
    player.update();
    player.draw();
    strokeWeight(0); fill(255);
    textAlign(LEFT, CENTER);
    text(player.shields, 40, height - 30, width - 80, 20);
    image(img.shield, 10, height - 30, 20, 20);
    player.end();
    textAlign(RIGHT, CENTER);
    text(player.coins, 40, height - 30, width - 68, 20);
    image(img.coin, width - 30, height - 30, 20, 20);
    textAlign(CENTER, CENTER);
    text(parseInt(frameCount / 100), 0, 10, width, 20);
    strokeWeight(1); noFill();
}

function mouse() {
    if (menu && (116 < mouseX) && (mouseX < 336)) {
        if ((266 < mouseY) && (mouseY < 320)) {
            difficulty = 2;
            item_chance *= 10;
            reset();
        }
        if ((326 < mouseY) && (mouseY < 380)) {
            difficulty = 4;
            reset();
        }
        if ((386 < mouseY) && (mouseY < 440)) {
            difficulty = 8;
            planet_chance *= 2;
            ufo_chance *= 2;
            item_chance = 0;
            reset();
        }
    }
    if (current_speed == 0) {
        reset();
    }
}
