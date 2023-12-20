const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide the username"],
        unique: [true, "username is already taken"]
    },
    email: {
        type: String,
        required: [true, "Please provide the valid email address"],
        unique: [true, "emailid is already taken"]
    },
    password: {
        type: String,
        required: [true, "Please provide the valid password"]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)