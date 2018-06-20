const GRID_SIZE = 16;
const COLS = 8;
const ROWS = 6;

export default {
  // Map
  GRID_SIZE,
  COLS,
  ROWS,

  CANVAS_WIDTH: COLS * GRID_SIZE,
  CANVAS_HEIGHT: ROWS * GRID_SIZE,

  // Dims for drawing and collisions.
  PLAYER_W: 16,
  PLAYER_H: 32,
  // Not used at
  PLAYER_COLL_W: 14,
  PLAYER_COLL_H: 28,
};
