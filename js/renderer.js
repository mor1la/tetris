class Renderer {
    constructor(canvas, blockSize = 30) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.blockSize = blockSize;
    }

    resizeToBoard(board) {
        this.canvas.width = board.cols * this.blockSize;
        this.canvas.height = board.rows * this.blockSize;
    }

    draw(game) {
        const { ctx, blockSize } = this;
        const { board, currentTetromino: activeTetromino } = game; 
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let y = 0; y < board.rows; y++) {
            for (let x = 0; x < board.cols; x++) {
                const cell = board.grid[y][x];
                if (cell) {
                    ctx.fillStyle = cell;
                    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                    ctx.strokeStyle = '#222';
                    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
                }
            }
        }
    
        if (activeTetromino) {
            const { shape, color, x: px, y: py } = activeTetromino;
            for (let y = 0; y < shape.length; y++) {
                for (let x = 0; x < shape[y].length; x++) {
                    if (shape[y][x]) {
                        ctx.fillStyle = color;
                        ctx.fillRect((px + x) * blockSize, (py + y) * blockSize, blockSize, blockSize);
                        ctx.strokeRect((px + x) * blockSize, (py + y) * blockSize, blockSize, blockSize);
                    }
                }
            }
        }
    }
    
    drawNextPreview(nextTetromino) {
        const div = document.getElementById('nextPreview');
        if (!div) return;

        div.innerHTML = '';
        const previewCanvas = document.createElement('canvas');
        const cell = Math.max(10, Math.floor(this.blockSize / 2));
        previewCanvas.width = cell * 4;
        previewCanvas.height = cell * 4;
        div.appendChild(previewCanvas);

        const ctx = previewCanvas.getContext('2d');
        const shape = nextTetromino.shape;
        const rows = shape.length;
        const cols = shape[0].length;
        const offsetX = Math.floor((4 - cols) / 2);
        const offsetY = Math.floor((4 - rows) / 2);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (shape[y][x]) {
                    ctx.fillStyle = nextTetromino.color;
                    ctx.fillRect((offsetX + x) * cell, (offsetY + y) * cell, cell, cell);
                    ctx.strokeStyle = '#333';
                    ctx.strokeRect((offsetX + x) * cell, (offsetY + y) * cell, cell, cell);
                }
            }
        }
    }

    drawGameOver(score) {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 10);
        ctx.font = '16px sans-serif';
        ctx.fillText(`Счёт: ${score}`, this.canvas.width / 2, this.canvas.height / 2 + 20); // исправлено
    }
}
