function Player() {
    this.x = 100;
    this.y = 250;
    this.velocity = 0;
    this.acceleration = 3;
}

Player.prototype.reset = function() {
    this.x = 100;
    this.y = 250;
    this.velocity = 0;
}

Player.prototype.update = function(delta) {
    if (keysDown[32] && !jump) {
        jump = true;
        this.velocity = 1;
        this.y -= 1;
    }
    this.velocity -= this.acceleration * (delta / 1000);


    this.y -= this.velocity;


    if (this.y >= canvas.height || this.y <= 0) {
        reset();
    }
}

Player.prototype.render = function() {
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(this.x, this.y, 100 , 50);
}