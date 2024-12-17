const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, // Author of the post
    content: { type: String, required: true },
    imageUrl: { type: String, default: '' }, // Optional image
    likes: {
        count: { type: Number, default: 0 },
        users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Comments on the post
    commentCount: { type: Number, default: 0 }, // Cached count of comments
    timestamp: { type: Date, default: Date.now }, // When the comment was made
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
