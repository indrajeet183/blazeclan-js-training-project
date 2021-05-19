const _crypto = require('crypto')

const algorithm = 'aes-256-gcm', password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY', iv = '60iP0h6vJoEa'

const encrypt = (text) => {
    const iv = _crypto.randomBytes(16);
    const salt = _crypto.randomBytes(64);
    const key = _crypto.pbkdf2Sync(password, salt, 2145, 32, 'sha512');
    const cipher = _crypto.createCipheriv(algorithm, key, iv);

    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

function decrypt(encrypted) {
    const bData = Buffer.from(encrypted, 'base64');
    const salt = bData.slice(0, 64);
    const iv = bData.slice(64, 80);
    const tag = bData.slice(80, 96);
    const text = bData.slice(96);
    const key = _crypto.pbkdf2Sync(password, salt, 2145, 32, 'sha512');
    const decipher = _crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);

    const decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

    return decrypted;
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt