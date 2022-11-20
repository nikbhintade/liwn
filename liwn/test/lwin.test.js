const expect = require("chai").expect;
const { describe, it } = require("mocha");

const { generateNonce, verifySignature, perpareMessage } = require("..");
const nacl = require('tweetnacl');

describe("LWIN", () => {
    it("should generate a nonce", () => {
        const nonce = generateNonce();
        expect(nonce).to.be.a("string");
    })

    it("should verify message", () => {
        const {publicKey, secretKey} = nacl.sign.keyPair();
        
        const message = perpareMessage("hello world message can be as long as possible");
        
        const signature = nacl.sign.detached(message, secretKey);
        
        expect(verifySignature(message, signature, publicKey)).to.be.equal(true);
    })
})
