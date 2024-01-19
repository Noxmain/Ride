function Player() {
    Element.call(this, "player", width * 0.5, height * 0.8, 10);
    this.ys = 0;
    this.shields = 0;
    this.coins = 0;

    this.update = function() {
        // movement
        if (keyIsDown(LEFT_ARROW)) {this.xs = -1;}
        if (keyIsDown(RIGHT_ARROW)) {this.xs = 1;}
        if (keyIsDown(UP_ARROW)) {this.ys = -0.75;}
        if (keyIsDown(DOWN_ARROW)) {this.ys = 1.25;}
        this.x = min(max(this.x + this.xs * speed, this.r), width - this.r);
        this.y = min(max(this.y + this.ys * speed, this.r), height - this.r);
        this.xs *= 0.9;
        this.ys *= 0.9;
        // collision
        obstacle = collide(this, obstacles())
        if (obstacle) {
            this.shields -= 1;
            obstacle.y += height;
        }
        item = collide(this, items())
        if (item) {
            if (item.e == "coin") {this.coins += 1;}
            if (item.e == "shield") {this.shields += 1;}
            if (item.e == "slowmotion") {slowmotion = 300;}
            item.y += height;
        }
    }

    this.end = function() {
        if (this.shields >= 0) return;
        current_speed = 0;
        image(img.over, 0, 0, width, height);
        noLoop();
    }
}
