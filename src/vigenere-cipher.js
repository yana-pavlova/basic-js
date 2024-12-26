const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  checkParams(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
  }

  defineCypherStr(message, key) {
    const cypherStrLength = message.replace(/[^A-Z]/g, '').length;
    return key.repeat(Math.ceil(cypherStrLength / key.length)).slice(0, cypherStrLength);
  }

  process(message, key, mode) {
    this.checkParams(message, key);
    message = message.toUpperCase();
    key = key.toUpperCase();
    const extendedKey = this.defineCypherStr(message, key);

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        const messageIndex = this.alphabet.indexOf(message[i]);
        const keyCharIndex = this.alphabet.indexOf(extendedKey[keyIndex]);

        const newIndex =
          mode === 'encrypt'
            ? (messageIndex + keyCharIndex) % this.alphabet.length
            : (messageIndex - keyCharIndex + this.alphabet.length) % this.alphabet.length;

        result += this.alphabet[newIndex];
        keyIndex++;
      } else {
        result += message[i];
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  encrypt(message, key) {
    return this.process(message, key, 'encrypt');
  }

  decrypt(message, key) {
    return this.process(message, key, 'decrypt');
  }
}

module.exports = {
  VigenereCipheringMachine
};
