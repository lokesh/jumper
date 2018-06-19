/**
 * World global
 * Loads level data and can then be used for collision detection between
 * entities and the level map.
 */

import c from './constants';
import log from './log';

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

    log.track('topLeft', topLeft);
    log.track('bottomLeft', bottomLeft);
    log.track('topRight', topRight);
    log.track('bottomRight', bottomRight);


    // let topLeftTile = this.level.rows[topLeft.row][topLeft.col]

    let topCollision = (topLeft !== '.' || topRight !== '.');
    let topSnap = 0;
    if (topCollision) {
       topSnap = (Math.floor(y / c.GRID_SIZE) * c.GRID_SIZE) + c.GRID_SIZE;
    }

    let bottomCollision = (bottomLeft !== '.' || bottomRight !== '.');
    let bottomSnap = c.CANVAS_HEIGHT;
    if (bottomCollision) {
       bottomSnap = (Math.floor((y + entity.height) / c.GRID_SIZE) * c.GRID_SIZE) - entity.height;
    }


    let leftCollision = (bottomLeft !== '.' && topLeft !== '.');
    let leftSnap = 0;
    if (leftCollision) {
       leftSnap = (Math.floor(x / c.GRID_SIZE) * c.GRID_SIZE) + entity.width;
    }

    let rightCollision = (bottomRight !== '.' && topRight !== '.');
    let rightSnap = c.CANVAS_WIDTH;
    if (rightCollision) {
       rightSnap = ((Math.floor(x / c.GRID_SIZE)) * c.GRID_SIZE);
    }

    log.track('rightSnap', rightSnap);
    return {
      top: topCollision,
      right: rightCollision,
      bottom: bottomCollision,
      left: leftCollision,
      topSnap,
      bottomSnap,
      leftSnap,
      rightSnap,
    };
  }

  p2t(x, y) {
    let row = Math.floor(y / c.GRID_SIZE);
    let col = Math.floor(x / c.GRID_SIZE);

    log.track('row', row);
    log.track('col', col);

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
