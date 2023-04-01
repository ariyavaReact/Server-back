var CryptoJS = require("crypto-js");
const config = require("../config/development");
const key = config.key;

// Encrypt
exports.encrypt = encrypt = (text) => {
  var ciphertext = CryptoJS.AES.encrypt(text, key).toString();
  return ciphertext;
};

// Decrypt
exports.decrypt = decrypt = (text) => {
  var bytes = CryptoJS.AES.decrypt(text, key);
  var decryptText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptText;
};
