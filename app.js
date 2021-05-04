console.log('javascript up and running!')
const canvas = document.querySelector('#myCanvas')
const ctx = canvas.getContext("2d")


let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 5
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false

// keeping track of the score
let score = 0

// number of lives
let lives = 3

let level = 0

// Setting up the brick variables
// let brickRowCount = 5
// let brickColumnCount = 10
// let brickWidth = 40
// let brickHeight = 15
// let brickPadding = 5
// let brickOffsetTop = 30
// let brickOffsetLeft = 15

// const bricks = [];
// for (let c = 0; c < brickColumnCount; c++) {
//     bricks[c] = [];
//     for (let r = 0; r < brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0, status: 1 };
//     }
// }

let bricks = levels[level].createBricks()

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawBricks = () => {
    for (let c = 0; c < levels[level].brickColumnCount; c++) {
        for (let r = 0; r < levels[level].brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (levels[level].brickWidth + levels[level].brickPadding)) + levels[level].brickOffsetLeft;
                let brickY = (r * (levels[level].brickHeight + levels[level].brickPadding)) + levels[level].brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, levels[level].brickWidth, levels[level].brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawBricks()
    collisionDetection()
    drawScore()
    drawLevel()
    drawLives()
    x += dx
    y += dy
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
            // dx ++
            // dy --
        } else {
            lives--
            if (!lives) {
                alert("GAME OVER!")
                document.location.reload()
                clearInterval(interval)
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }


        }

    }

    if (rightPressed) {
        paddleX += 7
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth
        }
    } else if (leftPressed) {
        paddleX -= 7
        if (paddleX < 0) {
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

const mouseMoveHandler = (e) => {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

const collisionDetection = () => {
    for (let c = 0; c < levels[level].brickColumnCount; c++) {
        for (let r = 0; r < levels[level].brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + levels[level].brickWidth && y > b.y && y < b.y + levels[level].brickHeight) {
                    dy = -dy;
                    b.status = 0
                    score++
                    if (score === levels[level].brickRowCount * levels[level].brickColumnCount) {
                        alert(`YOU WIN, CONGRATULATIONS! score: ${score}`);
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

const drawScore = () => {
    ctx.font = "16px Arial"
    ctx.fillStyle = "#0095DD"
    ctx.fillText(`Score: ${score}`, 8, 20)
}

const drawLives = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

const drawLevel = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Level: ${level+1}`, canvas.width/2, 20)
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false)

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