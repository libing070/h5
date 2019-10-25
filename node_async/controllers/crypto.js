//crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。
let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('不支持 crypto');
}
const secret='secret-key';
const hash=crypto.createHash('sha256',secret).update('1').digest('hex');
console.log(hash);
console.log('1ffd10b061877d8edbe91af1dc9b334403c135979dc9a3e505ef070f0207169c'==='1ffd10b061877d8edbe91af1dc9b334403c135979dc9a3e505ef070f0207169c')