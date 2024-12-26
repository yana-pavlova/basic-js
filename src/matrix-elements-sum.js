const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  let sum = 0;
  const indexesToIgnore = new Set();

  matrix.forEach((row) => {
    row.forEach((cell, j) => {
      if (indexesToIgnore.has(j)) {
        return;
      }
      if (cell === 0) {
        indexesToIgnore.add(j);
      } else {
        sum += cell;
      }
    })
  })

  console.log(indexesToIgnore)
  return sum
}

module.exports = {
  getMatrixElementsSum
};
