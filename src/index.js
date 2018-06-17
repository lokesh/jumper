import c from './constants';
import levels from './level-data';

import Key from './Key';
import Level from './Level';
import Player from './Player';
import World from './World';

const world = new World();
const player = new Player();
const level1 = new Level(levels[0]);

const canvas = document.getElementById('canvas');
canvas.width = c.MAP_TW * c.GRID_SIZE;
canvas.height = c.MAP_TH * c.GRID_SIZE;
const ctx = canvas.getContext('2d');

const key = new Key();
key.on();


const update = function() {
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

  // ------
  // UPDATE
  // ------

  player.update();

  // ----
  // DRAW
  // ----

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw Player
  ctx.fillRect(player.x, player.y, player.width, player.height);
  window.requestAnimationFrame(update);
}

update();
