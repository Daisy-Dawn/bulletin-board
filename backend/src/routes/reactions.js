const express = require('express')
const Post = require('../models/Post')
const Comment = require('../models/Comments')
const { verifyToken } = require('../utils/jwt-config')

const reactions = express.Router()

// like a post
reactions.put('/api/posts/:postId/like', verifyToken, async (req, res) => {
    const userId = req.user.id

    try {
        const post = await Post.findById(req.params.postId)

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' })
        }

        // Check if the user has already liked the post
        const userIndex = post.likes.users.findIndex(
            (id) => id.toString() === userId
        )

        if (userIndex === -1) {
            // User has not liked the post, so like it
            post.likes.users.push(userId)
            post.likes.count += 1
        } else {
            // User has already liked the post, so unlike it
            post.likes.users.splice(userIndex, 1)
            post.likes.count -= 1
        }

        await post.save()

        res.status(200).json({
            message: userIndex === -1 ? 'Post liked.' : 'Like removed.',
            likes: post.likes.count,
        })
    } catch (err) {
        console.error('Error updating like:', err)
        res.status(500).json({
            error: 'Internal server error.',
            details: err.message,
        })
    }
})

//like a comment or reply
reactions.patch(
    '/api/posts/:postId/comments/:commentId/like',
    verifyToken,
    async (req, res) => {
        const { postId, commentId } = req.params
        const userId = req.user.id

        try {
            // Check if it's a top-level comment
            let comment = await Comment.findOne({
                _id: commentId,
                postId,
            })

            if (comment) {
                const alreadyLiked = comment.likes.users.includes(userId)

                if (alreadyLiked) {
                    // Unlike the comment
                    comment.likes.users.pull(userId)
                    comment.likes.count -= 1
                } else {
                    // Like the comment
                    comment.likes.users.pull(userId)
                    comment.likes.count += 1
                }

                await comment.save()
                return res.status(200).json({
                    message: 'Like toggled successfully on top-level comment.',
                    data: comment.likes,
                })
            }

            // Check if it's a reply
            const parentComment = await Comment.findOne({
                postId,
                'replies._id': commentId,
            })

            if (!parentComment) {
                return res.status(404).json({
                    error: 'Comment or reply not found.',
                })
            }

            const reply = parentComment.replies.id(commentId)
            const alreadyLiked = reply.likes.users.includes(userId)

            if (alreadyLiked) {
                reply.likes.users.pull(userId)
                reply.likes.count -= 1
            } else {
                reply.likes.users.push(userId)
                reply.likes.count += 1
            }

            await parentComment.save()
            return res.status(200).json({
                message: 'Like toggled successfully on reply.',
                data: reply.likes,
            })
        } catch (err) {
            console.error('Error toggling like:', err)
            return res.status(500).json({
                error: 'Internal server error.',
                details: err.message,
            })
        }
    }
)

module.exports = reactions
