const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const uniqueNames = new Map();
  const result = [];

  names.forEach((name) => {
    if(uniqueNames.has(name)) {
      let suffix = uniqueNames.get(name) + 1;
      let newName = `${name}(${suffix})`;

      while (uniqueNames.has(newName)) {
        suffix++;
        newName = `${name}(${suffix})`;
      }

      uniqueNames.set(name, suffix);
      uniqueNames.set(newName, 0);
      result.push(newName);
    } else {
      uniqueNames.set(name, 0);
      result.push(name);
    }
  })

  return result;
}

module.exports = {
  renameFiles
};
