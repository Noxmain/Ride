let planet_chance = 1 / 100;
let ufo_chance = 1 / 600;
let item_chance = 1 / 1000;

let elements = [];
function planets() {return elements.filter(x => x.t == "planet");}
function ufos() {return elements.filter(x => x.t == "ufo");}
function items() {return elements.filter(x => x.t == "item");}
function obstacles() {return planets().concat(ufos());}
function collide(thing, things) {for (let t of things) {if (dist(t.x, t.y, thing.x, thing.y) <= t.r + thing.r) {return t;}}}

function Element(t, x, y, r) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.r = r;
    this.xs = 0;
    this.ys = 1;
    this.img = img.player;

    this.update = function() {
        this.x += this.xs * speed;
        this.y += this.ys * speed;

        if (this.xs != 0) {
            if (collide(this, planets())) {this.xs *= -1;}
            if (this.x + this.r >= width) {this.xs = -1;}
            if (this.x - this.r <= 0) {this.xs = 1;}
        }
    };

    this.visible = function() {
        return this.y - this.r < height;
    };

    this.draw = function() {
        image(this.img, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        if (HITBOXES) {circle(this.x, this.y, this.r * 2);}
    };
}

function Planet(x, r) {
    Element.call(this, "planet", x, -r, r);
    this.img = random(img.planets);
}

function Ufo(x, y) {
    Element.call(this, "ufo", x, y, 20);
    this.xs = random([1, -1]);
    this.img = img.ufo;
}

function Item(x, t) {
    Element.call(this, "item", x, -10, 10);
    this.img = img[t]
}
