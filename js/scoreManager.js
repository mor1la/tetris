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
        console.log(`Adding score: ${name} - ${score}`);
        const existingIndex = this.highscores.findIndex(entry => entry.name === name);
        
        if (existingIndex !== -1) {
            if (score > this.highscores[existingIndex].score) {
                this.highscores[existingIndex].score = score;
            }
        } else {
            this.highscores.push({ name, score });
        }
        
        this.highscores.sort((a, b) => b.score - a.score);
        this.highscores = this.highscores.slice(0, 10);
        this.save();
    }

    getHighscores() {
        return this.highscores;
    }
}
