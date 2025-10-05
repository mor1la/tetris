class Tetromino {
    constructor(shape, color, type = null) {
        this.shape = shape;
        this.color = color;
        this.type = type;
        this.x = 3;
        this.y = 0;
    }

    rotate() {
        const rows = this.shape.length;
        const cols = this.shape[0].length;
        const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                rotated[x][rows - 1 - y] = this.shape[y][x];
            }
        }
        return rotated;
    }

    applyRotation() {
        this.shape = this.rotate();
    }
}

const TETROMINO_DATA = {
    I: { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: 'cyan' },
    O: { shape: [[1,1],[1,1]], color: 'yellow' },
    T: { shape: [[0,1,0],[1,1,1],[0,0,0]], color: 'purple' },
    S: { shape: [[0,1,1],[1,1,0],[0,0,0]], color: 'green' },
    Z: { shape: [[1,1,0],[0,1,1],[0,0,0]], color: 'red' },
    J: { shape: [[1,0,0],[1,1,1],[0,0,0]], color: 'blue' },
    L: { shape: [[0,0,1],[1,1,1],[0,0,0]], color: 'orange' },
};