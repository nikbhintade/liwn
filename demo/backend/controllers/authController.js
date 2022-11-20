const jwt = require("jsonwebtoken");
const {generateNonce, perpareMessage, verifySignature} = require("liwn");
const User = require("../models/userModel");

const nonce = async (req, res) => {

    const {address} = req.body;
    const nonce = generateNonce();

    let user = await User.findOne({address});

    if(user) {
        await User.updateOne({
            nonce: nonce
        })
    } else {
        await User.create({
            address: address,
            nonce: nonce
        })
    }

    res.status(200).json({
        nonce: nonce
    })
}

const authenticate = async (req, res) => {
    
    const { message, publickey, signature } = req.body;

    let parsedMessage = JSON.parse(message)

    let user = await User.findOne({address: parsedMessage.address});
    if(user){
        console.log("user Exsists!");
    }
    if(user) {
        console.log(`This is stored user nonce: ${user.nonce}`);
        console.log(`This is sent user nonce: ${parsedMessage.nonce}`);
        if(user.nonce == parsedMessage.nonce) {
            let u8message = perpareMessage(message);
            let u8Signature = Uint8Array.from(Object.values(signature))
            let u8Publickey = Uint8Array.from(Object.values(publickey.data))

            if(verifySignature(u8message, u8Signature, u8Publickey)) {
                res.status(200).json({
                    token: generateToken(parsedMessage.address)
                })
            } else {
                res.status(400);
                throw new Error('Invalid signature');
            }
        } else {
            res.status(400);
            throw new Error('Used wrong nonce for signature');
        }
    } else {
        res.status(400);
        throw new Error('address doesn\'t exsist');
    }
}

const generateToken = (address) => {
    return jwt.sign({address}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { nonce, authenticate }