const passport  = require('passport');
const crypto = require('crypto');


const genpassword = (password) => {

    var salt = crypto.randomBytes(32).toString('hex');
    var genhash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt : salt,
        hash : genhash
    }

}


const validpassword = (password, hash, salt) => {
    verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
}


module.exports.genpassword = genpassword;
module.exports.validpassword = validpassword;