const express = require('express')
const Comment = require('../models/Comments')
const Post = require('../models/Post')
const { verifyToken } = require('../utils/jwt-config')
const paginationMiddleware = require('../middlewares/pagination-middleware')

const commentsRouter = express.Router()

// Create a new comment or reply
commentsRouter.post(
    '/api/posts/:postId/comments',
    verifyToken,
    async (req, res) => {
        const { postId } = req.params
        const { content, parentCommentId } = req.body
        const userId = req.user.id // Assume user ID is available from token middleware

        try {
            // Check if the post exists
            const post = await Post.findById(postId)
            if (!post) {
                return res.status(404).json({
                    error: 'Post not found.',
                    details: `No post exists with ID: ${postId}.`,
                })
            }

            if (parentCommentId) {
                // Add a reply to the parent comment's `replies` array
                const reply = {
                    content,
                    userId,
                    timestamp: new Date(),
                    likes: { count: 0, users: [] },
                }

                const updatedParentComment = await Comment.findOneAndUpdate(
                    { _id: parentCommentId, postId },
                    { $push: { replies: reply } },
                    { new: true }
                )

                if (!updatedParentComment) {
                    return res.status(404).json({
                        error: 'Parent comment not found or invalid.',
                        details: `The parent comment with ID: ${parentCommentId} does not exist or does not belong to post: ${postId}.`,
                    })
                }

                return res.status(201).json({
                    message: 'Reply added successfully.',
                    data: reply,
                })
            } else {
                // Create a new top-level comment
                const comment = new Comment({
                    content,
                    postId,
                    userId,
                    likes: { count: 0, users: [] },
                    replies: [],
                })

                await comment.save()

                return res.status(201).json({
                    message: 'Comment added successfully.',
                    data: comment,
                })
            }
        } catch (err) {
            console.error('Error creating comment:', err)
            return res.status(500).json({
                error: 'Internal server error.',
                details: err.message,
            })
        }
    }
)

// Get all comments for a post with nested replies
commentsRouter.get(
    '/api/posts/:postId/comments',
    verifyToken,
    paginationMiddleware(Comment), // Apply pagination middleware
    async (req, res) => {
        const { postId } = req.params

        try {
            // Check if the post exists
            const post = await Post.findById(postId)
            if (!post) {
                return res.status(404).json({
                    error: 'Post not found.',
                    details: `No post exists with ID: ${postId}.`,
                })
            }

            // Extract paginated results from middleware
            const { data, totalDocuments, currentPage, totalPages, pageSize } =
                res.paginatedResults

            // Populate user details for top-level comments and replies
            const populatedComments = await Comment.populate(data, [
                {
                    path: 'userId',
                    select: '_id username displayName profilePicture',
                },
                {
                    path: 'replies.userId',
                    select: '_id username displayName profilePicture',
                },
            ])

            // Final response format
            return res.status(200).json({
                message: 'Comments fetched successfully.',
                pagination: {
                    totalDocuments,
                    currentPage,
                    totalPages,
                    pageSize,
                },
                comments: populatedComments,
            })
        } catch (err) {
            console.error('Error fetching comments:', err)
            return res.status(500).json({
                error: 'Internal server error.',
                details: err.message,
            })
        }
    }
)

//update a comment or reply
commentsRouter.patch(
    '/api/posts/:postId/comments/:commentId',
    verifyToken,
    async (req, res) => {
        const { postId, commentId } = req.params
        const { content } = req.body
        const userId = req.user.id

        try {
            // First, check if it's a top-level comment
            let updatedComment = await Comment.findOneAndUpdate(
                {
                    _id: commentId,
                    postId,
                    userId, // Ensure only the author can edit
                },
                { content, timestamp: Date.now() }, // Update content and timestamp
                { new: true } // Return the updated document
            ).populate('userId', '_id username displayName profilePicture')

            // If updatedComment exists, it's a top-level comment
            if (updatedComment) {
                return res.status(200).json({
                    message: 'Top-level comment updated successfully.',
                    data: updatedComment,
                })
            }

            // Otherwise, check if it's a reply
            const parentComment = await Comment.findOne({
                postId,
                'replies._id': commentId,
                'replies.userId': userId,
            })

            if (!parentComment) {
                return res.status(404).json({
                    error: 'Comment or reply not found, or unauthorized.',
                })
            }

            // Update the specific reply inside the replies array
            const reply = parentComment.replies.id(commentId)
            reply.content = content
            reply.timestamp = Date.now()

            await parentComment.save() // Save the updated document

            return res.status(200).json({
                message: 'Reply updated successfully.',
                data: reply,
            })
        } catch (err) {
            console.error('Error updating comment/reply:', err)
            return res.status(500).json({
                error: 'Internal server error.',
                details: err.message,
            })
        }
    }
)

commentsRouter.delete(
    '/api/posts/:postId/comments/:commentId',
    verifyToken,
    async (req, res) => {
        const { postId, commentId } = req.params
        const userId = req.user.id

        try {
            // 1. Attempt to delete a top-level comment
            const deletedComment = await Comment.findOneAndDelete({
                _id: commentId,
                postId,
                userId, // Ensure only the author can delete
            })

            if (deletedComment)
                return res.status(200).json({
                    message:
                        'Top-level comment and its replies deleted successfully.',
                })

            // 2. Attempt to delete a reply
            const parentComment = await Comment.findOneAndUpdate(
                {
                    postId,
                    'replies._id': commentId,
                    'replies.userId': userId,
                },
                { $pull: { replies: { _id: commentId } } }, // Remove the specific reply
                { new: true }
            )

            if (!parentComment)
                return res.status(404).json({
                    error: 'Comment or reply not found, or unauthorized to delete.',
                })

            return res.status(200).json({
                message: 'Reply deleted successfully.',
            })
        } catch (err) {
            console.error('Error deleting comment/reply:', err)
            return res.status(500).json({
                error: 'Internal server error.',
                details: err.message,
            })
        }
    }
)

//get comment or reply by id
commentsRouter.get(
    '/api/posts/:postId/comments/:commentId',
    verifyToken,
    async (req, res) => {
        const { postId, commentId } = req.params

        try {
            const comment = await Comment.findOne({
                _id: commentId,
                postId,
            }).populate('userId', '_id username displayName profilePicture')

            if (comment) {
                return res.status(200).json({
                    message: 'Top-level comment fetched successfully.',
                    data: comment,
                })
            }

            // Search for replies
            const parentComment = await Comment.findOne({
                postId,
                'replies._id': commentId,
            }).populate(
                'replies.userId',
                '_id username displayName profilePicture'
            )

            if (!parentComment) {
                return res
                    .status(404)
                    .json({ error: 'Comment or reply not found.' })
            }

            const reply = parentComment.replies.id(commentId)

            return res.status(200).json({
                message: 'Reply fetched successfully.',
                data: reply,
            })
        } catch (err) {
            console.error('Error fetching comment:', err)
            return res.status(500).json({
                error: 'Internal server error.',
                details: err.message,
            })
        }
    }
)
module.exports = commentsRouter
