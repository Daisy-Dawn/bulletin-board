const express = require('express')
const User = require('../models/User')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const {
    validateUserCreation,
    validateUserId,
    validateUserUpdate,
    validateGetUsersQuery,
} = require('../middlewares/uservalidations')
const {
    requireAuth,
    saveUserSessionAndCookieSetter,
} = require('../middlewares/sessionmiddlewares')
const { hashPassword, comparePassword } = require('../utils/hashPasswords')
const {
    registerLimiter,
    loginLimiter,
} = require('../middlewares/rate-limit-middleware')
const passport = require('passport')
const { generateToken, verifyToken } = require('../utils/jwt-config')
const usersRouter = express.Router()

//middleware to handlevalidation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed to the next middleware or route handler
}

//CREATE A NEW USER
usersRouter.post(
    '/auth/register',
    validateUserCreation, // Middleware to validate user input
    handleValidationErrors, // Middleware to handle validation errors
    registerLimiter, // Rate limiter for signup
    async (req, res) => {
        const { username, displayName, email, password } = req.body

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

            // Create new user
            const newUser = await User.create({
                username,
                displayName,
                email,
                password: hashedPassword,
            })

            // Generate a JWT token for the new user
            const token = generateToken(newUser)

            // Respond with the token and user details
            res.status(201).json({
                message: 'Registration successful',
                token,
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    displayName: newUser.displayName,
                    email: newUser.email,
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
usersRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

//CALLBACK FOR GOOGLE AUTH
usersRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        // Generate a token for the authenticated user
        const token = generateToken(req.user)

        // Send the token and user details in the response
        res.status(200).json({
            message: 'Google OAuth successful',
            token,
            user: {
                id: req.user.id,
                username: req.user.username,
                displayName: req.user.displayName,
                email: req.user.email,
            },
        })
    }
)

//LOCAL LOGIN
usersRouter.post(
    '/auth/login',
    loginLimiter,
    passport.authenticate('local'),

    async (req, res) => {
        // Generate a token for the authenticated user
        const token = generateToken(req.user)

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

//GET ALL USERS AND FILTER TOO
usersRouter.get(
    '/api/users',
    verifyToken,
    validateGetUsersQuery,
    handleValidationErrors,
    async (req, res) => {
        const { username, displayName } = req.query

        try {
            const filter = {}
            // Only apply filters if the query parameters are provided
            if (username) {
                filter.username = { $regex: username, $options: 'i' } // Case-insensitive match
            }
            if (displayName) {
                filter.displayName = { $regex: displayName, $options: 'i' } // Case-insensitive match
            }

            // Fetch users based on the filter or all users if no filter is applied
            const users = await User.find(filter)

            // If no users match the filter, return an empty array
            if (users.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'No users found matching the filter' })
            }

            // Return the filtered users
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
)

//GET A SINGLE USER BY ID
usersRouter.get(
    '/api/users/:id',
    verifyToken,
    validateUserId,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params

        try {
            // Find the user by ID
            const findUser = await User.findById(id)
            // If no user is found, return a 404 status
            if (!findUser) {
                return res.status(404).send({ message: 'User not found' })
            }
            // Return the user based on the parsed ID
            return res.status(200).json(findUser)
        } catch (err) {
            console.log(err)
            return res.status(500).send({ message: 'Internal Server Error' })
        }
    }
)

//UPDATE A USER INFO
usersRouter.patch(
    '/api/users/:id',
    verifyToken,
    validateUserId,
    validateUserUpdate,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params
        const { body } = req

        try {
            // Await the result of findByIdAndUpdate
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: body },
                { new: true, runValidators: true }
            )

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' })
            }

            return res
                .status(200)
                .json({ message: 'Update Successful!', data: updatedUser })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
)

//DELETE A USER
usersRouter.delete(
    '/api/users/:id',
    verifyToken,
    validateUserId,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params

        try {
            const deletedUser = await User.findByIdAndDelete(id)
            if (!deletedUser) {
                return res.status(404).send({ message: 'User not found' })
            }
            return res
                .status(200)
                .json({ message: 'Delete Successful!', data: deletedUser })
        } catch (err) {
            console.log(err)
            return res.status(500).send({ message: 'Internal Server Error' })
        }
    }
)

//USER LOGOUT
usersRouter.post('/api/logout', verifyToken, (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return res
                .status(500)
                .json({ error: 'Failed to logout', message: err.message })
        res.clearCookie('connect.sid') // clear session cookie

        res.clearCookie('userSession') // Clear the signed cookie
        res.status(200).json({ message: 'Logout successful' })
    })
})

//GET ALL SESSION DATA
usersRouter.get('/api/admin/me', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Users session data',
        user: req.session.user,
    })
})

module.exports = usersRouter
