document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById("highscores");
    const highscores = JSON.parse(localStorage.getItem("tetris_highscores")) || [];
    
    container.innerHTML = highscores.map((s, i) => 
        `<div>${i + 1}. ${s.name} — ${s.score}</div>`
    ).join("") || "Пока пусто";

    document.getElementById("loginBtn").addEventListener("click", function() {
        window.location.href = "index.html";
    });
});