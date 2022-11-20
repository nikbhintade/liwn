const nacl = require('tweetnacl')

const generateNonce = () => {
    const nonce = nacl.randomBytes(16);
    return Buffer.from(nonce).toString('hex');
}

const verifySignature = (message, signature, publicKey) => {
    return nacl.sign.detached.verify(message, signature, publicKey);
}
const perpareMessage = (string) => {
    var buf = new ArrayBuffer(string.length*2);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=string.length; i < strLen; i++) {
    bufView[i] = string.charCodeAt(i);
    }
    return bufView;
}

module.exports = {generateNonce, perpareMessage, verifySignature}