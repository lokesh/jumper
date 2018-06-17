/**
 * World global
 * Loads level data and can then be used for collision detection between
 * entities and the level map.
 */

import c from './constants';

class World {
  constructor() {
    this.level = [];
  }

  setLevel(level) {
    this.level = level;
  }

  checkCollisions(entity) {
    let x = entity.x + entity.velX;
    let y = entity.y + entity.velY;

    let topLeft = this.p2t(x, y);
    let topRight = this.p2t(x + entity.width, y);
    let bottomLeft = this.p2t(x, y + entity.height);
    let bottomRight = this.p2t(x + entity.width, y + entity.height);

    return {
      top: (topLeft !== '.' || topRight !== '.'),
      right: (topRight !== '.' || bottomRight !== '.'),
      bottom: (bottomLeft !== '.' || bottomRight !== '.'),
      left: (topLeft !== '.' || bottomLeft !== '.'),
    };
  }

  p2t(x, y) {
    let row = Math.floor(y / c.GRID_SIZE);
    let col = Math.floor(x / c.GRID_SIZE);

    if ((row >= c.ROWS) ||
        (row < 0) ||
        (col >= c.COLS) ||
        (col < 0)) {
      return '#';
    }

    return this.level.rows[row][col];
  }
}

const world = new World();

export default world;
