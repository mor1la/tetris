class Game {
    constructor(rows = 20, cols = 10) {
        this.board = new Board(rows, cols);
        this.currentTetromino = this.randomTetromino();
        this.nextTetromino = this.randomTetromino();
        this.score = 0;
        this.gameOver = false;
    }

    randomTetromino() {
        const keys = Object.keys(TETROMINO_DATA);
        const key = keys[Math.floor(Math.random() * keys.length)];
        const { shape, color } = TETROMINO_DATA[key];
        return new Tetromino(JSON.parse(JSON.stringify(shape)), color, key);
    }

    reset() {
        this.board.clear();
        this.currentTetromino = this.randomTetromino();
        this.nextTetromino = this.randomTetromino();
        this.score = 0;
        this.gameOver = false;
    }

    moveDown() {
        if (this.board.isValidMove(this.currentTetromino, 0, 1)) {
            this.currentTetromino.y++;
            return true;
        } else {
            this.lockTetromino();
            return false;
        }
    }

    moveLeft() {
        if (this.board.isValidMove(this.currentTetromino, -1, 0)) {
            this.currentTetromino.x--;
        }
    }

    moveRight() {
        if (this.board.isValidMove(this.currentTetromino, 1, 0)) {
            this.currentTetromino.x++;
        }
    }

    rotate() {
        const rotated = this.currentTetromino.rotate();
        if (this.board.isValidMove({ ...this.currentTetromino, shape: rotated }, 0, 0)) {
            this.currentTetromino.applyRotation();
        }
    }

    hardDrop() {
        let dropDistance = 0;
        while (this.board.isValidMove(this.currentTetromino, 0, dropDistance + 1)) {
            dropDistance++;
        }
        this.currentTetromino.y += dropDistance;
        this.lockTetromino(); 
    }

    lockTetromino() {
        this.board.placeTetromino(this.currentTetromino);
        const cleared = this.board.clearLines();
        this.score += cleared * 100;

        this.currentTetromino = this.nextTetromino;
        this.nextTetromino = this.randomTetromino();

        if (!this.board.isValidMove(this.currentTetromino, 0, 0)) {
            this.gameOver = true;
        }
    }

    update() {
        if (!this.gameOver) {
            this.moveDown();
        }
    }
}
