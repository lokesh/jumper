/**
 * https://github.com/processing/p5.js/blob/5f6b4ab7e1c1a680186e52a9a1ac3f63450e8406/src/math/random.js#L79
 *
 * Return a random floating-point number.
 *
 * Takes either 0, 1 or 2 arguments.
 *
 * If no argument is given, returns a random number from 0
 * up to (but not including) 1.
 *
 * If one argument is given and it is a number, returns a random number from 0
 * up to (but not including) the number.
 *
 * If one argument is given and it is an array, returns a random element from
 * that array.
 *
 * If two arguments are given, returns a random number from the
 * first argument up to (but not including) the second argument.
 *
 */
function random(min, max) {
  var rand = Math.random();

  if (typeof min === 'undefined') {
    return rand;
  } else if (typeof max === 'undefined') {
    if (min instanceof Array) {
      return min[Math.floor(rand * min.length)];
    } else {
      return rand * min;
    }
  } else {
    if (min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }

    return rand * (max - min) + min;
  }
};

export default random;
