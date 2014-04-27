function Tube(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
}
var aTubes = [];
var aBuffer = [];

function spawnTube() {
    aTubes = [];
    for (var i = 0; i < 19; i += 2) {

            aTubes[i] = new Tube(canvas.width + i * 200, 0, 100);
            aTubes[i + 1] = new Tube(canvas.width + i * 200, canvas.height - 200, 100);


    }
}

function updateTube(delta) {
    timeCheck += delta;
    if (timeCheck >= 10) {
        timeCheck = 0;
        for (var i = 0; i < aTubes.length; i++) {
            aTubes[i].x -= 3;
            if (aTubes[i].x + aTubes[i].width <= 0) {
                aBuffer = [];
                aBuffer = aTubes.slice(0, 2);
                aTubes.splice(0, 2);
                aBuffer[0].x = aTubes[aTubes.length - 2].x + 400;
                aBuffer[1].x = aTubes[aTubes.length - 2].x + 400;
                aTubes.splice(aTubes.length, 0, aBuffer[0], aBuffer[1]);

            }
        }
    }
}

function renderTube() {
    for (var i = 0; i < aTubes.length; i++){
        ctx.fillStyle = "rgb(50, 50, 50)";
        ctx.fillRect(aTubes[i].x, aTubes[i].y, 100 , 200);
    }
}