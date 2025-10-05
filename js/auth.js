document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");

    const savedName = localStorage.getItem("tetris.username");
    if (savedName) {
        usernameInput.value = savedName;
    }

    usernameInput.addEventListener("change", function(){
        localStorage.setItem("tetris.username", this.value);
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (usernameInput.value.trim()) {
            localStorage.setItem("tetris.username", usernameInput.value.trim());
            window.location = "game.html";
        }
    });
});

