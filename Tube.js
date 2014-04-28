function Tube(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 300;
}

var aBuffer = [];

function spawnTube() {
    aTubes = [];
    var randomX;
    var randomY;
    for (var i = 0; i < 7; i += 2) {
        randomX = randomTubeX();
        randomY = randomTubeY();
        if (i == 0) {
            aTubes[i] = new Tube(canvas.width + 10, randomY, 100);
            aTubes[i + 1] = new Tube(canvas.width + 10, randomY + 300 + 150, 100);
        } else {
            aTubes[i] = new Tube(aTubes[i - 1].x + randomX, randomY, 100);
            aTubes[i + 1] = new Tube(aTubes[i - 1].x  + randomX, randomY + 300 + 150, 100);
        }
    }
}

function updateTube(delta) {
    for (var i = 0; i < aTubes.length; i++) {
        aTubes[i].x -= 200 * (delta / 1000);
        if ( aTubes[i].x < canvas. width) {
            if (aTubes[i].x + aTubes[i].width <= 0) {
                var randomX = randomTubeX();
                var randomY = randomTubeY();
                aBuffer = [];
                aBuffer = aTubes.slice(0, 2);
                aTubes.splice(0, 2);
                aBuffer[0].x = aTubes[aTubes.length - 1].x + randomX;
                aBuffer[1].x = aTubes[aTubes.length - 1].x + randomX;
                aTubes.splice(aTubes.length, 0, aBuffer[0], aBuffer[1]);
            }
        }
    }
}

function renderTube() {
    for (var i = 0; i < aTubes.length; i++){
        if (aTubes[i].x < canvas.width) {
            if (i % 2 == 0){
                ctx.fillStyle = "rgb(250, 50, 50)";
                //ctx.fillRect(aTubes[i].x, 0, 100 , aTubes[i].y + 300);
                ctx.strokeRect(aTubes[i].x, 0, 100 , aTubes[i].y + 300);
            } else {
                ctx.fillStyle = "rgb(250, 50, 50)";
                //ctx.fillRect(aTubes[i].x, aTubes[i].y, 100 , canvas.width);
                ctx.strokeRect(aTubes[i].x, aTubes[i].y, 100 , canvas.width);
            }

        }
    }
}

function randomTubeX() {
    var maximum = 5;
    var minimum = 3;
    return 100 * Math.floor(Math.random()* (maximum - minimum + 1) + minimum);
}

function randomTubeY() {
    return - Math.floor(Math.random()* 250);
}