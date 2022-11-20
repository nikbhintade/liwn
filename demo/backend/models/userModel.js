const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: [true, "Please add name"]
        },
        nonce: {
            type: String,
            required: [true, "Please add email"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)