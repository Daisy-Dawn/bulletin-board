const express = require('express')
const Post = require('../models/Post')
const Comment = require('../models/Comments')
const { verifyToken } = require('../utils/jwt-config')
const { handleValidationErrors } = require('../middlewares/uservalidations')
const { upload } = require('../config/cloudinaryConfig')
const paginationMiddleware = require('../middlewares/pagination-middleware')

const posts = express.Router()

//CREATE A POST for a specific user
posts.post(
    '/api/posts',
    verifyToken,
    upload.single('postImage'), // 'postImage' is the field name for the file upload
    async (req, res) => {
        const { content } = req.body

        if (!content) {
            return res.status(400).json({ error: 'Post content is required.' })
        }

        const userId = req.user.id

        try {
            const userPostImage = req.file ? req.file.path : ''

            const newPost = new Post({
                content,
                userId,
                imageUrl: userPostImage,
            })

            const savedPost = await newPost.save()

            res.status(201).json({
                message: 'Post created successfully!',
                data: savedPost,
            })
        } catch (err) {
            console.error('Error creating post:', err)
            res.status(500).json({
                error: 'An error occurred while creating the post.',
                message: err.message,
            })
        }
    }
)

// GET POSTS FOR A SPECIFIC USER
posts.get(
    '/api/posts/user/:userid',
    verifyToken,
    handleValidationErrors,
    paginationMiddleware(Post),
    async (req, res) => {
        const { userid } = req.params

        try {
            const userPosts = await Post.find({
                userId: userid,
            }).populate('comments')

            if (!userPosts.length) {
                return res
                    .status(404)
                    .json({ message: 'No posts found for this user.' })
            }

            return res.status(200).json({
                message: 'Posts retrieved successfully.',
                data: res.paginatedResults,
            })
        } catch (err) {
            console.error('Error fetching user posts:', err)
            return res.status(500).json({
                error: 'An error occurred while retrieving posts.',
                message: err.message,
            })
        }
    }
)

//GET ALL POSTS FOR ALL USERS
posts.get(
    '/api/posts',
    verifyToken,
    handleValidationErrors,
    paginationMiddleware(Post),
    async (req, res) => {
        try {
            const allPosts = await Post.find().populate('comments')

            res.status(200).json({
                message: 'All posts retrieved successfully.',
                data: res.paginatedResults,
            })
        } catch (err) {
            console.error('Error fetching all posts:', err)
            res.status(500).json({
                error: 'Error fetching posts.',
                message: err.message,
            })
        }
    }
)

//GET A SINGULAR POST
posts.get(
    '/api/posts/:postId',
    verifyToken,
    handleValidationErrors,
    async (req, res) => {
        const { postId } = req.params

        try {
            const post = await Post.findById(postId).populate('comments')

            if (!post)
                return res.status(404).json({ message: 'Post not found.' })

            res.status(200).json({
                message: 'Post retrieved successfully.',
                data: post,
            })
        } catch (err) {
            console.error('Error fetching the post:', err)
            res.status(500).json({
                error: 'Error fetching the post.',
                message: err.message,
            })
        }
    }
)

//UPDATE A SINGULAR POST
posts.put(
    '/api/posts/:postId',
    verifyToken,
    handleValidationErrors,
    async (req, res) => {
        const { postId } = req.params
        const { content } = req.body
        const userId = req.user.id

        try {
            // Ensure the user owns the post
            const post = await Post.findOne({ _id: postId, userId })

            if (!post) {
                return res
                    .status(404)
                    .json({ error: 'Post not found or unauthorized.' })
            }

            // Update the post content
            post.content = content || post.content
            const updatedPost = await post.save()

            res.status(200).json({
                message: 'Post updated successfully.',
                data: updatedPost,
            })
        } catch (err) {
            console.error('Error updating the post:', err)
            res.status(500).json({
                error: 'Error updating the post.',
                message: err.message,
            })
        }
    }
)

//DELETE A SINGULAR POST
posts.delete(
    '/api/posts/:id',
    verifyToken,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params

        try {
            const post = await Post.findByIdAndDelete(id)

            if (!post) {
                return res.status(404).json({ message: 'Post not found.' })
            }

            return res.status(200).json({
                message: 'Post deleted successfully.',
                data: post,
            })
        } catch (err) {
            console.error('Error deleting the post:', err)
            return res.status(500).json({
                error: 'Error deleting the post.',
                message: err.message,
            })
        }
    }
)

module.exports = posts
