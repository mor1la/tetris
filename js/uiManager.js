class UIManager {
    constructor({ startBtnId, pauseBtnId, restartBtnId, scoreId, levelId, highscoresContainerId, pauseOverlayId }) {
        this.startBtn = document.getElementById(startBtnId);
        this.pauseBtn = document.getElementById(pauseBtnId);
        this.restartBtn = document.getElementById(restartBtnId);
        this.scoreEl = document.getElementById(scoreId);
        this.levelEl = document.getElementById(levelId);
        this.highscoresContainer = document.getElementById(highscoresContainerId);
        this.pauseOverlay = document.getElementById(pauseOverlayId);

        this.onStart = null;
        this.onPause = null;
        this.onRestart = null;

        this.initButtons();
    }

    initButtons() {
        if (this.startBtn) this.startBtn.addEventListener('click', () => this.onStart?.());
        if (this.pauseBtn) this.pauseBtn.addEventListener('click', () => this.onPause?.());
        if (this.restartBtn) this.restartBtn.addEventListener('click', () => this.onRestart?.());
    }

    updateScore(score) {
        if (this.scoreEl) this.scoreEl.textContent = `Очки: ${score}`;
    }
    
    updateLevel(level) {
        if (this.levelEl) this.levelEl.textContent = `Уровень: ${level}`;
    }
    
    askPlayerName(score) {
        const name = prompt(`Игра окончена! Ваш счёт: ${score}\nВведите имя:`, 'Игрок');
        return name && name.trim() ? name.trim() : 'Игрок';
    }

    renderHighscores(highscores) {
        if (!this.highscoresContainer) return;
        this.highscoresContainer.innerHTML = highscores.map((s, i) =>
            `<div>${i + 1}. ${s.name} — ${s.score}</div>`
        ).join('');
    }
    
    showPause() {
        if (this.pauseOverlay) {
            this.pauseOverlay.style.display = 'flex';
        }
    }

    hidePause() {
        if (this.pauseOverlay) {
            this.pauseOverlay.style.display = 'none';
        }
    }
}
