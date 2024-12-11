const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        googleId: { type: String, unique: true, sparse: true },
        displayName: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: {
            type: String,
            required: function () {
                return !this.googleId
            },
        }, // Required only for non-Google users
        profilePicture: { type: String, default: '' },
        location: { type: String, default: '' },
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
