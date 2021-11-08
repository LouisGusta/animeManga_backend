const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    updated: {
        type: Date,
        default: Date.now()
    },
    creted: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: ''
    },
    fullname: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    public: {
        type: Boolean,
        required: false
    }
})

module.exports = Users = model("Users", userSchema)