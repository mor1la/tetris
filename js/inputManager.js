class InputManager {
    constructor() {
        this.onMoveLeft = null;
        this.onMoveRight = null;
        this.onRotate = null;
        this.onSoftDrop = null;
        this.onHardDrop = null;
        this.onPauseToggle = null;

        window.addEventListener('keydown', (e) => this.handleKey(e));
    }

    handleKey(e) {
        switch (e.code) {
            case 'ArrowLeft': case 'KeyA': e.preventDefault(); this.onMoveLeft?.(); break;
            case 'ArrowRight': case 'KeyD': e.preventDefault(); this.onMoveRight?.(); break;
            case 'ArrowUp': case 'KeyW': e.preventDefault(); this.onRotate?.(); break;
            case 'ArrowDown': case 'KeyS': e.preventDefault(); this.onSoftDrop?.(); break;
            case 'Space': e.preventDefault(); this.onHardDrop?.(); break;
            case 'KeyP': e.preventDefault(); this.onPauseToggle?.(); break;
        }
    }
}
