import c from './constants';
import int from './conversion';
import log from './log';
import random from './math';
import world from './world';


class Player {
  /**
   * @param  {x,y} optional
   */
  constructor(options = {}) {
    this.width = c.PLAYER_W;
    this.height = c.PLAYER_H;

    const defaults = {
      x: parseInt(random(0, c.CANVAS_WIDTH - this.width)),
      y: parseInt(random(0, c.CANVAS_HEIGHT - this.height)),
    }

    let opts = Object.assign(defaults, options);
    Object.keys(defaults).forEach(prop => {
      this[prop] = opts[prop];
    });

    this.speed = 1.5;
    this.drag = 0.8;
    this.gravity = 0.3;
    this.jumpForce = 8;

    this.velX = 0;
    this.velY = 0;

    this.leftLimit = 0;
    this.rightLimit = c.CANVAS_WIDTH - this.width;
    this.bottomLimit = int(c.CANVAS_HEIGHT - this.height);

    this.isJumping = false;
  }

  update() {
    this.velX *= this.drag;
    this.velY += this.gravity;

    let collisions = world.checkCollisions(this);
    log.track('collisions', collisions);

    // if ((!collisions.left && this.velX < 0) ||
    //     (!collisions.right && this.velX > 0)) {
      this.x += this.velX;
    // }

    // if ((!collisions.bottom && this.velY > 0) ||
    //     (!collisions.top && this.velX < 0)) {
      this.y += this.velY;
    // }

    if (this.y > this.bottomLimit) {
      this.y = this.bottomLimit;
      this.isJumping = false;
    }

    if (this.x > this.rightLimit) {
      this.x = this.rightLimit;
    } else if (this.x < this.leftLimit) {
      this.x = this.leftLimit;
    }
  }

  up() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velY = -this.jumpForce;
    }
  }

  down() {
    // this.velY += this.speed;
  }

  left() {
    // Skid. If moving right, transition to left slowly.
    if (this.velX > 0) {
      this.velX -= (this.speed / 10);
    } else {
      this.velX -= this.speed;
    }

  }

  right() {
    if (this.velX > 0) {
      this.velX += this.speed;
    } else {
      // Skid. If moving left, transition to right slowly
      this.velX += (this.speed / 10);
    }

  }

  draw() {
    push();

    if (this.isJumping) {
      fill(100, 200 ,255);
    } else {
      fill(100);
    }


    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

export default Player;
