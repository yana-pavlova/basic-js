const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if(!Array.isArray(arr)) {
    throw new Error ("'arr' parameter must be an instance of the Array!")};

  const doubleArr = structuredClone(arr);

  for(let i = 0; i < doubleArr.length; i++) {
    switch(doubleArr[i]) {
      case '--discard-next':
        doubleArr.splice(i,2, false);
        break;
      case '--discard-prev':
        if(i === 0) {
          doubleArr.splice(i,1, false);
          break
        };
        doubleArr.splice(i-1,2, false);
        break;
      case '--double-next':
        doubleArr[i] = doubleArr[i+1];
        break;
      case '--double-prev':
        if(i === 0) {
          doubleArr.splice(i,1,false);
          break
        };
        doubleArr[i] = doubleArr[i-1];
        break;
      default:
        break;
    }
  }

  return doubleArr.filter(Boolean);
}

module.exports = {
  transform
};

transform([1, 2, 3, '--discard-next', 1337, '--double-prev', 4, 5])