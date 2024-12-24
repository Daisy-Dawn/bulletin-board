const express = require('express')
const {
    validateUserCreation,
    handleValidationErrors,
} = require('../middlewares/uservalidations')
const {
    registerLimiter,
    loginLimiter,
} = require('../middlewares/rate-limit-middleware')
const { hashPassword } = require('../utils/hashPasswords')
const passport = require('passport')
const { generateToken, verifyToken } = require('../utils/jwt-config')
const { upload } = require('../config/cloudinaryConfig')
const User = require('../models/User')

const auth = express.Router()

//CREATE A NEW USER
auth.post(
    '/auth/register',
    upload.single('profilePicture'),
    validateUserCreation, // Middleware to validate user input
    handleValidationErrors, // Middleware to handle validation errors
    registerLimiter, // Rate limiter for signup
    async (req, res) => {
        const { username, displayName, email, password, location } = req.body

        try {
            // Check if the email already exists
            const emailExists = await User.findOne({ email })
            if (emailExists) {
                return res.status(400).json({
                    error: 'Email already exists. Please use a different email.',
                })
            }

            // Check if the username already exists
            const usernameExists = await User.findOne({ username })
            if (usernameExists) {
                return res.status(400).json({
                    error: 'Username already exists. Please choose a different username.',
                })
            }

            // Hash the password using the bcrypt
            const hashedPassword = await hashPassword(password)

            // Apply default values for location and profilePicture
            const userLocation = location || 'anywhere'
            // Handle profile picture upload
            const userProfilePicture = req.file ? req.file.path : ''

            // Create new user
            const newUser = await User.create({
                username,
                displayName,
                email,
                password: hashedPassword,
                location: userLocation,
                profilePicture: userProfilePicture,
            })

            // Generate a JWT token for the new user
            const token = generateToken(newUser)

            // Set the signed cookie
            res.cookie('userid', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                signed: true, // Sign the cookie
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            })

            // Respond with the token and user details
            res.status(201).json({
                message: 'Registration successful',
                token,
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    displayName: newUser.displayName,
                    email: newUser.email,
                    location: newUser.location,
                    profilePicture: newUser.profilePicture,
                },
            })
        } catch (err) {
            res.status(500).json({
                error: 'An error occurred while creating the user',
                message: err.message,
            })
        }
    }
)

//GOOGLE AUTH
auth.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

//CALLBACK FOR GOOGLE AUTH
auth.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        console.log('User authenticated:', req.user)
        const token = generateToken(req.user)

        // Set the signed cookie
        res.cookie('userid', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true, // Sign the cookie
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })

        res.status(200).json({
            message: 'Google OAuth successful',
            token,
            user: {
                id: req.user.id,
                username: req.user.username,
                displayName: req.user.displayName,
                email: req.user.email,
                location: req.user.location || 'anywhere',
                profilePicture: req.user.profilePicture || '',
            },
        })
    }
)

//LOCAL LOGIN
auth.post(
    '/auth/login',
    loginLimiter,
    passport.authenticate('local'),

    async (req, res) => {
        // Generate a token for the authenticated user
        const token = generateToken(req.user)

        // Set the signed cookie
        res.cookie('userid', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true, // Sign the cookie
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })

        // Send the token, user info, and success message as the response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: req.user.id,
                username: req.user.username,
                displayName: req.user.displayName,
            },
        })
    }
)

//USER LOGOUT
auth.post('/auth/logout', verifyToken, (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return res
                .status(500)
                .json({ error: 'Failed to logout', message: err.message })
        res.clearCookie('connect.sid') // clear session cookie
        res.clearCookie('userid') // clear userid cookie

        res.clearCookie('userSession') // Clear the signed cookie
        res.status(200).json({ message: 'Logout successful' })
    })
})

module.exports = auth
