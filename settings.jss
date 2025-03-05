let gameSettings = {
    fov: 75,
    renderDistance: 100,
    controls: {
        moveForward: 'KeyW',
        moveBackward: 'KeyS',
        moveLeft: 'KeyA',
        moveRight: 'KeyD',
        jump: 'Space',
        sprint: 'ShiftLeft',
        crouch: 'ControlLeft',
        placeBlock: 'Mouse1',
        breakBlock: 'Mouse0'
    }
};

// Function to change controls dynamically
function updateControl(action, newKey) {
    gameSettings.controls[action] = newKey;
    console.log(`${action} is now set to ${newKey}`);
}
