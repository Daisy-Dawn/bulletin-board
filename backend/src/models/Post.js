const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    count: { type: Number, default: 0 },
})

const PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    reactions: { type: [reactionSchema], default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: { type: String, default: '' },
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
