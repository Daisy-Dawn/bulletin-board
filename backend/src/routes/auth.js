const express = require('express')
const jwt = require('jsonwebtoken')
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
const {
    generateAccessToken,
    verifyToken,
    generateRefreshToken,
} = require('../utils/jwt-config')
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

            // After successful registration, Generate an access and refresh token for the user
            const accessToken = generateAccessToken(newUser)
            const refreshToken = generateRefreshToken(newUser)

            // Set the signed cookie
            res.cookie('userid', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                signed: true, // Sign the cookie
                maxAge: 12 * 60 * 60 * 1000, // 12 hours
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
            })

            // Respond with the token and user details
            res.status(201).json({
                message: 'Registration successful',
                accessToken,
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
        // After successful login, Generate an access and refresh token for the user
        const accessToken = generateAccessToken(req.user)
        const refreshToken = generateRefreshToken(req.user)

        // Set the signed cookie
        res.cookie('userid', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true, // Sign the cookie
            maxAge: 12 * 60 * 60 * 1000, // 12 hours
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        })

        res.cookie('user', JSON.stringify(req.user), {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 12 * 60 * 60 * 1000, // 12 hours (you can adjust this as necessary)
        })

        // Redirect to frontend with user info
        res.redirect(`${process.env.DEVELOPMENT_URL}/auth/google/callback`)

        // res.redirect(`http://localhost:3000/auth/google/callback`)
        // res.redirect(`${process.env.FRONTEND_URL}/auth/callback`);

        // res.status(200).json({
        //     message: 'Google OAuth successful',
        //     accessToken,
        //     user: {
        //         id: req.user.id,
        //         username: req.user.username,
        //         displayName: req.user.displayName,
        //         email: req.user.email,
        //         location: req.user.location || 'anywhere',
        //         profilePicture: req.user.profilePicture || '',
        //     },
        // })
    }
)

//LOCAL LOGIN
auth.post(
    '/auth/login',
    loginLimiter,
    passport.authenticate('local'),

    async (req, res) => {
        // After successful login, Generate an access and refresh token for the user
        const accessToken = generateAccessToken(req.user)
        const refreshToken = generateRefreshToken(req.user)

        // Set the signed cookie
        res.cookie('userid', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true, // Sign the cookie
            maxAge: 12 * 60 * 60 * 1000, // 12 hours
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        })

        // Send the token, user info, and success message as the response
        res.status(200).json({
            message: 'Login successful',
            accessToken,
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
        res.clearCookie('refreshToken') // clear refreshToken cookie

        res.clearCookie('userSession') // Clear the signed cookie
        res.status(200).json({ message: 'Logout successful' })
    })
})

//GENERATE REFRESH TOKEN
auth.post('/auth/refresh-token', async (req, res) => {
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken)
        return res.status(401).json({ message: 'Refresh token is missing' })

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' })
        }

        // Generate a new access token
        const accessToken = generateAccessToken(user)

        res.status(200).json({ accessToken })
    } catch (error) {
        console.error('Error refreshing token:', err.message)
        res.status(403).json({ message: 'Invalid or expired refresh token' })
    }
})

module.exports = auth
