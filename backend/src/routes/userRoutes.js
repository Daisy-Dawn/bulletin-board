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
    '/api/register',
    validateUserCreation,
    handleValidationErrors,
    registerLimiter,
    async (req, res, next) => {
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

            // Hash the password using the helper function
            const hashedPassword = await hashPassword(password)

            // Create new user
            const newUser = await User.create({
                username,
                displayName,
                email,
                password: hashedPassword,
            })

            // Attach user to req for the session middleware
            req.user = newUser

            // Proceed to the session middleware
            next()
        } catch (err) {
            res.status(500).json({
                error: 'An error occurred while creating the user',
                message: err.message,
            })
        }
    },
    saveUserSessionAndCookieSetter, // Middleware to save session and set cookie
    (req, res) => {
        // Final response after session and cookie setup
        const { id, username, displayName, email } = req.session.user
        res.status(201).json({
            message: 'Registration successful and user logged in',
            user: { id, username, displayName, email },
        })
    }
)

//LOGIN A USER
usersRouter.post(
    '/api/login',
    loginLimiter,
    async (req, res, next) => {
        const { username, password } = req.body

        try {
            const user = await User.findOne({ username }).select('+password')
            if (!user) return res.status(404).json({ error: 'User not found' })

            // Compare hashed password & password check
            const passwordMatch = await comparePassword(password, user.password)
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid Credentials' })
            }

            // Attach user to req for the session middleware
            req.user = user

            // Proceed to the session middleware
            next()
        } catch (err) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: err.message,
            })
        }
    },
    saveUserSessionAndCookieSetter,
    (req, res) => {
        // Final response after session and cookie setup
        const { id, username, displayName } = req.session.user
        res.status(200).json({
            message: 'Login successful',
            user: { id, username, displayName },
        })
    }
)

//GET ALL USERS AND FILTER TOO
usersRouter.get(
    '/api/users',
    requireAuth,
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
    requireAuth,
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
    requireAuth,
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
    requireAuth,
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
usersRouter.post('/api/logout', requireAuth, (req, res) => {
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
usersRouter.get('/api/admin/me', requireAuth, (req, res) => {
    res.status(200).json({
        message: 'Users session data',
        user: req.session.user,
    })
})

module.exports = usersRouter
