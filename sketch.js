let HITBOXES = false;
let speed = 5;

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

let background_y = 0;
let planet_timer = 0;
function setup() {
    let c = createCanvas(450, 600);
    c.canvas.addEventListener("contextmenu", e => e.preventDefault());
    c.canvas.style.marginTop = ((window.innerHeight - height) / 2.5) + "px";
    stroke(255, 0, 0); strokeWeight(1); noFill(); noSmooth();

    background_y = height - width * img.background.height / img.background.width;
}

function draw() {
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
        let t = random(["coin", "coin", "coin", "shield", "shield", "slowmotion"]);
        let new_item = new Item(random(width), t);
        if (!collide(new_item, elements)) {elements.push(new_item);}
    }
    // update elements
    for (let element of elements) {
        element.update();
        element.draw();
    }
    // delete elements
    elements = elements.filter(x => x.visible());
}
