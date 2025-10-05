class GameController {
    constructor(game, renderer, uiManager, inputManager, scoreManager, options = {}) {
        this.game = game;
        this.renderer = renderer;
        this.ui = uiManager;
        this.input = inputManager;
        this.scores = scoreManager;

        this.dropInterval = options.baseInterval || 800;
        this.minInterval = options.minInterval || 80;
        this.levelUpEvery = options.levelUpEvery || 200;

        this.level = 1;
        this.running = false;
        this.paused = false;
        this._tickTimer = null;
        this._gameOverTriggered = false;

        this.ui.onStart = () => this.start();
        this.ui.onPause = () => this.togglePause();
        this.ui.onRestart = () => this.restart();

        this.input.onMoveLeft = () => this.moveLeft();
        this.input.onMoveRight = () => this.moveRight();
        this.input.onRotate = () => this.rotate();
        this.input.onSoftDrop = () => this.softDrop();
        this.input.onHardDrop = () => this.hardDrop();
        this.input.onPauseToggle = () => this.togglePause();

        this.renderer.resizeToBoard(this.game.board);
        this.ui.updateScore(0);
        this.ui.updateLevel(1);
        this.ui.renderHighscores(this.scores.getHighscores());
    }

    start() {
        if (this.running && !this.paused) return;
        if (this.game.gameOver) this.game.reset();

        this.running = true;
        this.paused = false;
        this._gameOverTriggered = false;

        this.ui.hidePause();

        this.scheduleTick();
        this.renderer.draw(this.game);
        this.ui.updateScore(this.game.score);
    }

    pause() {
        this.paused = true;
        this.running = false;
        clearInterval(this._tickTimer);

        this.ui.showPause();
    }

    togglePause() {
        if (this._gameOverTriggered) return;
        this.paused ? this.start() : this.pause();
    }

    restart() {
        clearInterval(this._tickTimer);
        this._tickTimer = null;
        
        this.running = false;
        this.paused = false;
        this.level = 1;   
        this._gameOverTriggered = false; 

        this.ui.hidePause();
       
        this.game.reset();
          
        this.ui.updateLevel(this.level);
        this.ui.updateScore(0);
               
        this.renderer.draw(this.game);
        this.renderer.drawNextPreview(this.game.nextTetromino);
        
        this.start();
    }

    scheduleTick() {
        clearInterval(this._tickTimer);
        const interval = this.getIntervalForLevel();
        this._tickTimer = setInterval(() => {
            if (!this.paused && this.running) this.tick();
        }, interval);
    }

    getIntervalForLevel() {
        return Math.max(this.minInterval, Math.round(this.dropInterval * Math.pow(0.85, this.level - 1)));
    }

    tick() {
        console.log("tick"); 
        
        if (this.game.gameOver || this._gameOverTriggered) {
            this.onGameOver();
            return;
        }
        
        this.game.moveDown();
        this.ui.updateScore(this.game.score);
        
        const newLevel = Math.floor(this.game.score / this.levelUpEvery) + 1;
        console.log(`Score: ${this.game.score}, LevelUpEvery: ${this.levelUpEvery}, NewLevel: ${newLevel}, CurrentLevel: ${this.level}`);
        if (newLevel > this.level) {
            this.level = newLevel;
            this.ui.updateLevel(this.level);
            this.scheduleTick();
        }
    
        this.renderer.draw(this.game);
        this.renderer.drawNextPreview(this.game.nextTetromino);
    
        if (this.game.gameOver) this.onGameOver();
    }
    
    moveLeft() {
        if (!this.running || this.paused) return;
        this.game.moveLeft();
        this.renderer.draw(this.game);
    }

    moveRight() {
        if (!this.running || this.paused) return;
        this.game.moveRight();
        this.renderer.draw(this.game);
    }

    rotate() {
        if (!this.running || this.paused) return;
        this.game.rotate();
        this.renderer.draw(this.game);
    }

    softDrop() {
        if (!this.running || this.paused) return;
        this.game.moveDown();
        this.renderer.draw(this.game);
    }

    hardDrop() {
        if (!this.running || this.paused) return;
        this.game.hardDrop();
        this.renderer.draw(this.game);
    }

    onGameOver() {

        if (this._gameOverTriggered) return;

        console.log('GameController.onGameOver() ВХОД');
        this._gameOverTriggered = true;
        this.renderer.drawGameOver(this.game.score);
    
        const playerName = localStorage.getItem("tetris.username") || "Игрок";
        this.scores.addScore(playerName, this.game.score);
    
        localStorage.setItem("tetris_highscores", JSON.stringify(this.scores.getHighscores()));
    
        setTimeout(() => {
            window.location.href = "highscores.html";
        }, 1500);
    }
    
}
