const express = require('express')
const User = require('../models/User')
const {
    validateUserId,
    validateUserUpdate,
    validateGetUsersQuery,
    handleValidationErrors,
} = require('../middlewares/uservalidations')
const { verifyToken } = require('../utils/jwt-config')
const { hashPassword } = require('../utils/hashPasswords')
const usersRouter = express.Router()

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

// UPDATE A USER INFO
usersRouter.patch(
    '/api/users/:id',
    verifyToken,
    validateUserId,
    validateUserUpdate,
    handleValidationErrors,
    async (req, res) => {
        const { id } = req.params
        const { password, ...otherFields } = req.body

        try {
            let updatedData = otherFields

            // Hash password if present
            if (password) {
                const hashedPassword = await hashPassword(password)
                updatedData.password = hashedPassword
            }

            // Await the result of findByIdAndUpdate
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: updatedData },
                { new: true, runValidators: true }
            )

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' })
            }

            // Exclude the password field from the response
            const { password: _, ...userResponse } = updatedUser.toObject()

            return res
                .status(200)
                .json({ message: 'Update Successful!', data: userResponse })
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

//GET ALL SESSION DATA
usersRouter.get('/api/admin/me', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Users session data',
        user: req.session.user,
    })
})

module.exports = usersRouter
