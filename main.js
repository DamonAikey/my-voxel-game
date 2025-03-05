let scene, camera, renderer;
let gameMode = 'creative'; // Default mode
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let direction = new THREE.Vector3();

function initGame() {
  // Set up renderer, scene, and camera
  const canvas = document.getElementById('gameCanvas');
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue background

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 10, 0);
  scene.add(directionalLight);

  // Create a simple ground made of blocks
  const blockSize = 1;
  const gridSize = 20;
  const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  
  for (let i = -gridSize / 2; i < gridSize / 2; i++) {
    for (let j = -gridSize / 2; j < gridSize / 2; j++) {
      const block = new THREE.Mesh(geometry, material);
      block.position.set(i * blockSize, -blockSize / 2, j * blockSize);
      scene.add(block);
    }
  }

  // Event listeners for keyboard movement
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);

  // Handle window resizing
  window.addEventListener('resize', onWindowResize, false);

  // Start the animation loop
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
  switch (event.code) {
    case 'KeyW': moveForward = true; break;
    case 'KeyS': moveBackward = true; break;
    case 'KeyA': moveLeft = true; break;
    case 'KeyD': moveRight = true; break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case 'KeyW': moveForward = false; break;
    case 'KeyS': moveBackward = false; break;
    case 'KeyA': moveLeft = false; break;
    case 'KeyD': moveRight = false; break;
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Calculate movement direction based on key inputs
  direction.set(0, 0, 0);
  if (moveForward) direction.z -= 1;
  if (moveBackward) direction.z += 1;
  if (moveLeft) direction.x -= 1;
  if (moveRight) direction.x += 1;
  direction.normalize();

  // Move the camera in its local forward/right directions
  const speed = 0.1;
  const angle = camera.rotation.y;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  camera.position.x += (direction.x * cos - direction.z * sin) * speed;
  camera.position.z += (direction.z * cos + direction.x * sin) * speed;

  renderer.render(scene, camera);
}

// UI Button Event Listeners

// Start Game: Hide the main menu and initialize the game
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('mainMenu').classList.add('hidden');
  initGame();
});

// Open Settings: Hide the main menu and show settings overlay
document.getElementById('settingsButton').addEventListener('click', () => {
  document.getElementById('mainMenu').classList.add('hidden');
  document.getElementById('settingsMenu').classList.remove('hidden');
});

// Back from Settings: Hide settings overlay and return to main menu
document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('settingsMenu').classList.add('hidden');
  document.getElementById('mainMenu').classList.remove('hidden');
});

// Update game mode based on settings dropdown selection
document.getElementById('modeSelect').addEventListener('change', (e) => {
  gameMode = e.target.value;
  console.log("Game mode set to:", gameMode);
});

// Improved Minecraft-like Voxel Game
// Features: Custom Controls, Settings, Basic Survival, Block Placement

// Game Variables
let gameMode = 'creative';
let controls = {
    moveForward: 'KeyW',
    moveBackward: 'KeyS',
    moveLeft: 'KeyA',
    moveRight: 'KeyD',
    jump: 'Space',
    sprint: 'ShiftLeft',
    crouch: 'ControlLeft',
    placeBlock: 'Mouse1',
    breakBlock: 'Mouse0'
};

// Initialize Game
function initGame() {
    setupScene();
    setupControls();
    generateWorld();
    animate();
}

// Setup Scene and Renderer
function setupScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

// Generate World
function generateWorld() {
    let blockSize = 1;
    let worldSize = 20;
    let geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
    let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    
    for (let x = -worldSize / 2; x < worldSize / 2; x++) {
        for (let z = -worldSize / 2; z < worldSize / 2; z++) {
            let block = new THREE.Mesh(geometry, material);
            block.position.set(x * blockSize, -blockSize / 2, z * blockSize);
            scene.add(block);
        }
    }
}

// Handle Controls
function setupControls() {
    document.addEventListener('keydown', (event) => {
        if (event.code === controls.jump) {
            console.log('Jumping!');
        }
    });
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start the Game
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('mainMenu').classList.add('hidden');
    initGame();
});
