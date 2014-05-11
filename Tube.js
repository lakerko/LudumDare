function Tube(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 300;
}

var aBuffer = [];

function spawnTube() {
    aTubes = [];
    var randomY;
    for (var i = 0; i < 19; i += 2) {
        randomY = randomTubeY();
        if (i == 0) {
            aTubes[i] = new Tube(canvas.width, randomY, 100);
            aTubes[i + 1] = new Tube(canvas.width, randomY + 300 + 150, 100);
        } else {
            aTubes[i] = new Tube(aTubes[i - 1].x + 500, randomY, 100);
            aTubes[i + 1] = new Tube(aTubes[i - 1].x  + 500, randomY + 300 + 150, 100);
        }
    }
}

function updateTube(delta) {
    var movementPerTime = 0;
    for (var i = 0; i < aTubes.length; i++) {
        if (i % 2 == 0) {
            movementPerTime = 0.25 * delta;
            aTubes[i].x -= movementPerTime;
            aTubes[i + 1].x -= movementPerTime;
        }
        if ( aTubes[i].x < canvas.width) {
            if (aTubes[i].x + aTubes[i].width <= 0) {
                var randomY = randomTubeY();
                aBuffer = [];
                aBuffer = aTubes.slice(0, 2);
                aTubes.splice(0, 2);
                aBuffer[0].x = aTubes[aTubes.length - 1].x + 500;
                aBuffer[0].y = randomY;
                aBuffer[1].x = aTubes[aTubes.length - 1].x + 500;
                aBuffer[1].y = randomY + 300 + 150;
                aTubes.splice(aTubes.length, 0, aBuffer[0], aBuffer[1]);
                scoreChecker = false;
            }
        }
    }
}

function renderTube() {
    for (var i = 0; i < aTubes.length; i++){
        if (aTubes[i].x < canvas.width) {
            if (i % 2 == 0){
                ctx.drawImage(bg, aTubes[i].x, 300 - Math.abs(aTubes[i].y) - 20, 100, 20, aTubes[i].x, 300 - Math.abs(aTubes[i].y) - 20, 100, 20);
                ctx.drawImage(bg, aTubes[i].x + 90, 0, 20, 300 - Math.abs(aTubes[i].y), aTubes[i].x + 90, 0, 20, 300 - Math.abs(aTubes[i].y));
                ctx.drawImage(tubeUp, 0, Math.abs(aTubes[i].y), 100, 300 - Math.abs(aTubes[i].y), aTubes[i].x, 0, 100, 300 - Math.abs(aTubes[i].y));
            } else {
                ctx.drawImage(bg, aTubes[i].x, aTubes[i].y, 100, 30, aTubes[i].x, aTubes[i].y, 100, 30);
                ctx.drawImage(bg, aTubes[i].x + 50, aTubes[i].y, 60, 500 - (aTubes[i - 1].y + 300 + 150), aTubes[i].x + 50, aTubes[i].y, 60, 500 - (aTubes[i - 1].y + 300 + 150));
                ctx.drawImage(tubeDown, 0, 0, 100, 500 - (aTubes[i - 1].y + 300 + 150), aTubes[i].x, aTubes[i].y, 100, 500 - (aTubes[i - 1].y + 300 + 150));
            }
        }
    }
}

function randomTubeY() {
    return - Math.floor(Math.random()* 250);
}