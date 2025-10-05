window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");

    const game = new Game();
    const renderer = new Renderer(canvas, 30);
    const ui = new UIManager({
        startBtnId: "startBtn",
        pauseBtnId: "pauseBtn",
        restartBtnId: "restartBtn",
        scoreId: "score",
        levelId: "level",
        highscoresContainerId: "highscores",
        pauseOverlayId: "pauseOverlay"
    });
    const input = new InputManager();
    const scores = new ScoreManager();

    const controller = new GameController(game, renderer, ui, input, scores, {
        baseInterval: 800,
        minInterval: 80,
        levelUpEvery: 200
    });

    renderer.resizeToBoard(game.board);
    renderer.draw(game);
    renderer.drawNextPreview(game.nextTetromino);
    controller.start();

});
