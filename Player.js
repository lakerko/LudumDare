function Player() {
    this.x = 100;
    this.y = 250;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
    this.acceleration = 3;
    this.previousPosition = this.y;
}

Player.prototype.reset = function() {
    this.x = 100;
    this.y = 250;
    this.velocity = 0;
}

Player.prototype.update = function(delta) {
    this.previousPosition = this.y;
    if (keysDown[32] && !jump) {
        jump = true;
        this.velocity = 8;
        this.y -= 3;
    }
    this.velocity -= this.acceleration * (delta / 100);

    this.y -= this.velocity;

    if (this.y >= canvas.height || this.y <= 0) {
        gameOver = true;
    }
}

Player.prototype.render = function(delta) {
    ctx.drawImage(bg, player.x, player.previousPosition, player.width, player.height, player.x, player.previousPosition, player.width, player.height);
    timeCounter += delta;
    if (timeCounter >= 200) {
        timeCounter = 0;
        animationCrop++;

        if (animationCrop * this.width >= batA.width) {
            animationCrop = 0;
        }
    }
    ctx.drawImage(batA, animationCrop * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}

Player.prototype.collisionDetection = function() {
    for (var i = 0; i < aTubes.length; i++) {
        if (aTubes[i].x < canvas.width) {
            if (this.x <= aTubes[i].x + aTubes[i].width &&
                aTubes[i].x <= this.x + this.width &&
                this.y <= aTubes[i].y + aTubes[i].height &&
                aTubes[i].y <= this.y + this.height) {
                gameOver = true;
            }
        }
    }
}

Player.prototype.scoreKeeper = function() {
    if (aTubes[0].x <= 20 && !scoreChecker) {
        score++;
        scoreChecker = true;
    }
}