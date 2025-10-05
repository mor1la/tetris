class ScoreManager {
    constructor(storageKey = 'tetris_highscores') {
        this.storageKey = storageKey;
        this.highscores = this.load();
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.highscores));
    }

    addScore(name, score) {
        this.highscores.push({ name, score });
        this.highscores.sort((a, b) => b.score - a.score);
        this.highscores = this.highscores.slice(0, 10);
        this.save();
    }

    getHighscores() {
        return this.highscores;
    }

    saveScore(score) {
        const username = localStorage.getItem("tetris.username") || "Игрок";
        this.highscores.push({ name: username, score });
        this.highscores.sort((a, b) => b.score - a.score);
        this.highscores = this.highscores.slice(0, 10); // топ-10
        localStorage.setItem("highscores", JSON.stringify(this.highscores));
    }
}
