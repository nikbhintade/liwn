const axios = require("axios");
const nacl = require("tweetnacl");
const {perpareMessage} = require("../../liwn");


const endpointCall = async () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000/api/',
        timeout: 1000
    });

    let nonce;
    let address = "senpai.near";

    const {publicKey, secretKey} = nacl.sign.keyPair();
        


    await instance.post('/nonce', {
        address: address
    }).then(async (res) => {
        nonce = res.data.nonce;
        console.log(`This is nonce sent by API: ${nonce}`)
        
        let message = {
            address: address,
            nonce: nonce,
            uri: "https://test.com/"
        }

        const cMessage = perpareMessage(JSON.stringify(message));
        
        const signature = nacl.sign.detached(cMessage, secretKey);

        await instance.post('authenticate', {
            message: JSON.stringify(message),
            publickey: {
                data: publicKey
            }, 
            signature: signature
        }).then( res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.data)
        })

    }).catch(err => {
        console.log(err)
    })

}

endpointCall();