const mongoose = require('mongoose')

// Define the schema for a reply
const ReplySchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: {
            count: { type: Number, default: 0 },
            users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        },
        timestamp: { type: Date, default: Date.now },
    },
    { _id: true }
)

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true, trim: true, maxLength: 500 }, // the text of the comment
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }, // ID of the post this comment belongs to
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, // ID of the user who made the comment
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    }, // ID of the parent comment for replies
    replies: [ReplySchema], // List of replies to this comment
    likes: {
        count: { type: Number, default: 0 },
        users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    },
    timestamp: { type: Date, default: Date.now }, // When the comment was made
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
