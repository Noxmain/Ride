function distance(a, b) {
    return dist(a.x, a.y, b.x, b.y);
}

function Element(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xs = 0;
    this.ys = 1;
    this.icon = icons.player;

    this.update = function() {
        this.x += this.xs * speed;
        this.y += this.ys * speed;
    };

    this.visible = function() {
        return this.y - this.r < world.height;
    };

    this.collide = function(other) {
        return distance(this, other) <= this.r + other.r;
    };

    this.draw = function() {
        image(this.icon, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    };
}

function Planet(x, r) {
    Element.call(this, x, -r, r);
    this.icon = random(icons.planets);
}

function Ufo(x, y, r) {
    Element.call(this, x, y, r);
    this.xs = random([1, -1]);
    this.icon = icons.ufo;
}
