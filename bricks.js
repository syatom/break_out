// The game levels array stores the brick layout and the parameters for the game play
const levels = [
    {
        brickRowCount: 3,
        brickColumnCount: 5,
        brickWidth: 75,
        brickHeight: 20,
        brickPadding: 10,
        brickOffsetTop: 30,
        brickOffsetLeft: 30,
        ballRadius: 10,
        get levelScore() { return 9 },
        get score() { return 9 },
        colors: ["#5FC8ED", "#60A6F7", "#627AE0", "#6F60F7", "#8C4EED"],
        bricks: [
            [{ x: 0, y: 0, status: 0, color: "#2F59F0" }, { x: 0, y: 0, status: 1, color: "#24E007" }, { x: 0, y: 0, status: 0, color: "#2F59F0" }],
            [{ x: 0, y: 0, status: 1, color: "#2F59F0" }, { x: 0, y: 0, status: 1, color: "#24E007" }, { x: 0, y: 0, status: 1, color: "#2F59F0" }],
            [{ x: 0, y: 0, status: 0, color: "#2F59F0" }, { x: 0, y: 0, status: 1, color: "#24E007" }, { x: 0, y: 0, status: 0, color: "#2F59F0" }],
            [{ x: 0, y: 0, status: 1, color: "#2F59F0" }, { x: 0, y: 0, status: 1, color: "#24E007" }, { x: 0, y: 0, status: 1, color: "#2F59F0" }],
            [{ x: 0, y: 0, status: 0, color: "#2F59F0" }, { x: 0, y: 0, status: 1, color: "#24E007" }, { x: 0, y: 0, status: 0, color: "#2F59F0" }]
        ],
        createBricks() {
            return this.bricks
        }
    }, {
        brickRowCount: 3,
        brickColumnCount: 5,
        brickWidth: 75,
        brickHeight: 20,
        brickPadding: 10,
        brickOffsetTop: 30,
        brickOffsetLeft: 30,
        ballRadius: 10,
        get score() { return this.brickRowCount * this.brickColumnCount + levels[0].score},
        get levelScore() { return this.brickRowCount * this.brickColumnCount },
        colors: ["#5FC8ED", "#60A6F7", "#627AE0", "#6F60F7", "#8C4EED"],
        bricks: [],
        createBricks() {
            for (let c = 0; c < this.brickColumnCount; c++) {
                this.bricks[c] = [];
                for (let r = 0; r < this.brickRowCount; r++) {
                    this.bricks[c][r] = { x: 0, y: 0, status: 1, color: this.colors[r] };
                }
            }
            return this.bricks
        }
    },
    {
        brickRowCount: 5,
        brickColumnCount: 10,
        brickWidth: 40,
        brickHeight: 15,
        brickPadding: 5,
        brickOffsetTop: 30,
        brickOffsetLeft: 15,
        ballRadius: 5,
        get levelScore() { return this.brickRowCount * this.brickColumnCount },
        get score() { return this.brickRowCount * this.brickColumnCount + levels[1].score },
        colors: ["#5FC8ED", "#60A6F7", "#627AE0", "#6F60F7", "#8C4EED"],
        bricks: [],
        createBricks() {
            for (let c = 0; c < this.brickColumnCount; c++) {
                this.bricks[c] = [];
                for (let r = 0; r < this.brickRowCount; r++) {
                    this.bricks[c][r] = { x: 0, y: 0, status: 1, color: this.colors[r] };
                }
            }
            return this.bricks
        }
    }
]