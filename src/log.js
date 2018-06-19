/**
 * Log global
 *
 * Example:
 *
 * log.track('Player X', player.x);
 */

import c from './constants';

class Log {
  constructor() {
    this.el = document.createElement('section');
    this.el.setAttribute('id', 'log')
    document.body.appendChild(this.el);
  }
  track(name, val) {
    let trackEl = document.getElementById(`track-${name}`);
    if (!trackEl) {
      trackEl = document.createElement('div');
      trackEl.setAttribute('id', `track-${name}`);
      this.el.appendChild(trackEl);
    }
    let valString = JSON.stringify(val, null, 4);
    trackEl.innerHTML = `${name}: ${valString}`;
  }
}

const log = new Log();

export default log;
