let canvas = document.querySelector('#functionDrawing');

let canvasDimensions = {
    width: window.innerWidth * 0.7,
    height: window.innerHeight * 0.7
};
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;

let ctx = canvas.getContext('2d');


ctx.translate(0, canvasDimensions.height / 2);


function drawFunction(aVar, fVar, fiVar) {
    let loopTo = 2 * (Math.PI).toFixed(3) * 1000;

    for(let i = 0; i < loopTo; i++) {

        let actualX = i / 1000;
        let actualY = aVar * Math.sin(fVar * actualX + fiVar);

        let drawX = canvasDimensions.width * actualX / 6.28;
        let drawY = actualY / 1000;

        let x = i / 160;
        let y = aVar * Math.sin(fVar * x + fiVar);

        ctx.beginPath();
        ctx.arc(i,y * window.innerHeight / 3,1,0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();

    }
}


drawFunction(2,1,1);


