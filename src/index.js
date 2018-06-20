import c from './constants';
import levels from './level-data';

import Key from './Key';
import Level from './Level';
import Player from './Player';
import world from './world';

const player = new Player();
const level = new Level(levels[0]);
world.setLevel(level);

const key = new Key();
key.on();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = c.CANVAS_WIDTH;
canvas.height = c.CANVAS_HEIGHT;


// Debugging
let showDebugGrid = true;

window.addEventListener('keypress', (e) => {
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 103: // g
      showDebugGrid = !showDebugGrid;
      break;
  }
})


const update = () => {
  // ----------
  // USER INPUT
  // ----------
  if (key.isDown('left')) {
    player.left();
  }

  if (key.isDown('right')) {
    player.right();
  }

  if (key.isDown('up')) {
    player.up();
  }

  if (key.isDown('grid')) {
    // console.log('toggle Grid');
  }


  // ------
  // UPDATE
  // ------
  player.update();

  // ------
  // Render
  // ------
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  renderMap(level);
  renderPlayer();

  window.requestAnimationFrame(update);
}

const renderMap = () => {
  ctx.fillStyle="#333333";
  for (let row = 0; row < c.ROWS; row++) {
    for (let col = 0; col < c.COLS; col++) {
      if (level.rows[row][col] == '#') {
        ctx.fillRect(col * c.GRID_SIZE, row * c.GRID_SIZE, c.GRID_SIZE, c.GRID_SIZE)
      }
    }
  }

  if (showDebugGrid) {
    ctx.strokeStyle="red";
    for (let row = 0; row < c.ROWS; row++) {
      for (let col = 0; col < c.COLS; col++) {
        ctx.strokeRect(col * c.GRID_SIZE, row * c.GRID_SIZE, c.GRID_SIZE, c.GRID_SIZE)
      }
    }
  }
}

const renderPlayer = () => {
  ctx.fillStyle="#ee77dd";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

update();
