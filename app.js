console.log('javascript up and running!')
const canvas = document.querySelector('#myCanvas')
const ctx = canvas.getContext("2d")


let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
const ballRadius = 10
let paddleHeight = 10
let paddleWidth = 120
let paddleX = (canvas.width-paddleWidth) / 2
let rightPressed = false
let leftPressed = false

// Setting up the brick variables
let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30

const bricks = [];
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

console.log(bricks)

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawBricks = () => {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

const draw = ()  => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawBricks()
    x += dx
    y += dy
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if ( y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
            // dx ++
            // dy --
        } else {
            alert("GAME OVER!")
            document.location.reload()
            clearInterval(interval)
        }
        
    }

    if(rightPressed) {
        paddleX += 7
        if ( paddleX + paddleWidth > canvas.width ) {
            paddleX = canvas.width - paddleWidth
        }
    } else if(leftPressed) {
        paddleX -= 7
        if (paddleX < 0 ) {
            paddleX = 0
        }
    }
}

const keyDownHandler = (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true
    }

    if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true
    }
}

const keyUpHandler = (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false
    }

    if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false
    }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

let interval = setInterval(draw, 10)



// // A rectangle
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// // A circule
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// // rectangle with outline only
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();