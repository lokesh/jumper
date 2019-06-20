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

    // this.collWidth = c.PLAYER_COLL_W;
    // this.collheight = c.PLAYER_COLL_H;

    const defaults = {
      x: parseInt(random(0, c.CANVAS_WIDTH - this.width)),
      y: parseInt(random(0, c.CANVAS_HEIGHT - this.height)),
    }

    let opts = Object.assign(defaults, options);
    Object.keys(defaults).forEach(prop => {
      this[prop] = opts[prop];
    });

    this.speed = 1.5;
    this.drag = 0.7;
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
    // 1. Check vertical collisions with velY
    // 2. Snap if collosions
    // 3. Check horizontal collision with velX
    // 4. Snap if collision

    let collisions = world.checkCollisions(this);
    log.track('collisions', collisions);

    this.velX *= this.drag;
    this.velY += this.gravity;

    if (collisions.bottom && this.velY > 0) {
      this.velY = 0;
      this.y = collisions.bottomSnap;
      this.isJumping = false;
    }

    if (collisions.top && this.velY < 0) {
      this.velY = 0;
      this.y = collisions.topSnap;
    }

    if (collisions.left && this.velX < 0) {
      this.velX = 0;
      this.x = collisions.leftSnap;
    }

    if (collisions.right && this.velX > 0) {
      this.velX = 0;
      this.x = collisions.rightSnap;
    }

    this.y += this.velY;
    this.x += this.velX;




    // if ((!collisions.bottom && this.velY > 0) ||
    //     (!collisions.top && this.velX < 0)) {

    // }

    // if (this.y > this.bottomLimit) {
    //   this.y = this.bottomLimit;
    //   this.isJumping = false;
    // }

    // if (this.x > this.rightLimit) {
    //   this.x = this.rightLimit;
    // } else if (this.x < this.leftLimit) {
    //   this.x = this.leftLimit;
    // }


    if (this.velX > -0.05 && this.velX < 0.05) {
      this.velX = 0;
    }
    if (this.velY > -0.05 && this.velY < 0.05) {
      this.velY = 0;
    }

    log.track('player.x', this.x);
    log.track('player.y', this.y);
    log.track('player.velX', this.velX);
    log.track('player.velY', this.velY);
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
