import { random } from './math';

class Player {
  constructor(options) {
    // Options
    let defaults = {
      width: 20,
      height: 40,
      x: 100,
      y: 100,
    };

    // this.x = parseInt(random(0, windowWidth - this.width));
    // this.y = parseInt(random(0, windowHeight - this.height));


    let opts = Object.assign(defaults, options);
    Object.keys(defaults).forEach(prop => {
      this[prop] = opts[prop];
    });

    // --

    this.speed = 2;
    this.drag = 0.8;
    this.gravity = 0.4;
    this.jumpForce = 10;

    this.velX = 0;
    this.velY = 0;

    this.leftLimit = 0;
    // this.rightLimit = windowWidth - this.width;
    // this.bottomLimit = int(windowHeight - this.height);

    this.isJumping = false;
  }

  update() {
    this.velX *= this.drag;
    this.velY += this.gravity;

    this.x += this.velX;
    this.y += this.velY;

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