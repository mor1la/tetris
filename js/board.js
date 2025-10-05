class Board {
    constructor(rows = 20, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createEmptyBoard();
    }

    createEmptyBoard() {
        return Array.from({ length: this.rows }, () =>
            Array(this.cols).fill(null)
        );
    }

    isValidMove(tetromino, offsetX = 0, offsetY = 0, newShape = null) {
        const shape = newShape || tetromino.shape;
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (!shape[y][x]) continue;

                const newX = tetromino.x + offsetX + x;
                const newY = tetromino.y + offsetY + y;

                if (newX < 0 || newX >= this.cols || newY >= this.rows) {
                    return false;
                }

                if (newY >= 0 && this.grid[newY][newX]) {
                    return false;
                }
            }
        }
        return true;
    }

    placeTetromino(tetromino) {
        for (let y = 0; y < tetromino.shape.length; y++) {
            for (let x = 0; x < tetromino.shape[y].length; x++) {
                if (tetromino.shape[y][x]) {
                    const boardY = tetromino.y + y;
                    const boardX = tetromino.x + x;
                    if (boardY >= 0 && boardY < this.rows) {
                        this.grid[boardY][boardX] = tetromino.color;
                    }
                }
            }
        }
    }

    clearLines() {
        let cleared = 0;
        
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.grid[y].every(cell => cell !== null)) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(this.cols).fill(null));
                cleared++;
                y++; 
            }
        }
        
        return cleared;
    }

    draw(context, blockSize) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const color = this.grid[y][x];
                if (color) {
                    context.fillStyle = color;
                    context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                    context.strokeStyle = "#333";
                    context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
                }
            }
        }
    }

    clear() {
        this.grid = this.createEmptyBoard();
    }
    
}