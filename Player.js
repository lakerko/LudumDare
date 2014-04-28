function Player() {
    this.x = 100;
    this.y = 250;
    this.width = 50;
    this.height = 50;
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
        this.velocity = 5;
        this.y -= 2;
    }
    this.velocity -= this.acceleration * (delta / 500);


    this.y -= this.velocity;


    if (this.y >= canvas.height || this.y <= 0) {
        reset();
    }
}

Player.prototype.render = function() {
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(this.x, this.y, 50 , 50);
}

Player.prototype.collisionDetection = function() {
    for (var i = 0; i < aTubes.length; i++) {
        if (aTubes[i].x < canvas.width) {
            if (this.x <= aTubes[i].x + aTubes[i].width &&
                aTubes[i].x <= this.x + this.width &&
                this.y <= aTubes[i].y + aTubes[i].height &&
                aTubes[i].y <= this.y + this.height) {
                reset();
            }
        }
    }
}