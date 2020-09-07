const bcryptjs = require("bcryptjs");
let { genSalt, hash, comapare } = bcryptjs;
const { promisify } = require("util");

genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(comapare);

module.exports.compare = compare;
//get password and generate the salt
module.exports.hash = (plainTextPasswordFromUser) =>
    genSalt().then((salt) => hash(plainTextPasswordFromUser, salt));
