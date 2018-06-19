/**
 * Keyboard Input handler
 *
 * Example:
 *
 * const key = new Key();
 * key.on();
 *
 * if (key.isDown('left')) { ... };
 */
class Key {
    constructor() {
      this.downKeys = {
        up: false, // Includes spacebar
        down: false,
        left: false,
        right: false,

        // Debugging
        grid: false,
        log: false,
      }

      this.onKeyUpOrDownBound = this.onKeyUpOrDown.bind(this);
    }

    on(options) {
      window.addEventListener('keydown', this.onKeyUpOrDownBound);
      window.addEventListener('keyup', this.onKeyUpOrDownBound);
    }

    off() {
      window.removeEventListener('keydown', this.onKeyUpOrDownBound);
      window.removeEventListener('keyup', this.onKeyUpOrDownBound);
    }

    onKeyUpOrDown(e) {
      let toggleKey = (e.type === 'keydown');

      switch (e.keyCode) {
        case 38: // up
        case 87: // w
        case 32: // space bar
          this.downKeys.up = toggleKey;
          break;
        case 40: // dpwn
        case 83: // s
          this.downKeys.down = toggleKey;
          break;
        case 37: // left
        case 65: // a
          this.downKeys.left = toggleKey;
          break;
        case 39: // right
        case 68: // d
          this.downKeys.right = toggleKey;
          break;
      }
    }

    isDown(key) {
      return this.downKeys[key];
    }
}


export default Key;
