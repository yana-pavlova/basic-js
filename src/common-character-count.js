const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  let count = 0;
  const vocab = {};

  for(let i = 0; i < s1.length; i++) {
    if(vocab.hasOwnProperty(s1[i])) {
      vocab[s1[i]] += 1;
    } else {
      vocab[s1[i]] = 1;
    }
  }

  for(let i = 0; i < s2.length; i++) {
    if(vocab.hasOwnProperty(s2[i]) && vocab[s2[i]] > 0) {
      vocab[s2[i]] -= 1;
      count++;
    }
  }

  return count;
}

module.exports = {
  getCommonCharacterCount
};
