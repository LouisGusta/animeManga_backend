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
        default: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v937-aew-111_3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=8ce2cd03f94f2baddcb332cfb50f78b9'
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
        required: true,
        select: false
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