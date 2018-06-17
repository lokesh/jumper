/**
 * https://github.com/processing/p5.js/blob/5badc8c763bb038d8e6f6e44cff68ba54ab2cf4a/src/utilities/conversion.js#L42
 *
 * Converts a boolean, string, or float to its integer representation.
 * When an array of values is passed in, then an int array of the same length
 * is returned.
 * print(int('10')); // 10
 * print(int(10.31)); // 10
 * print(int(-10)); // -10
 * print(int(true)); // 1
 * print(int(false)); // 0
 * print(int([false, true, '10.3', 9.8])); // [0, 1, 10, 9]

 */

function int(n, radix) {
  radix = radix || 10;
  if (typeof n === 'string') {
    return parseInt(n, radix);
  } else if (typeof n === 'number') {
    return n | 0;
  } else if (typeof n === 'boolean') {
    return n ? 1 : 0;
  } else if (n instanceof Array) {
    return n.map(function(n) {
      return p5.prototype.int(n, radix);
    });
  }
};

export default int;
