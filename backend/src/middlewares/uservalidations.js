const { body, param, query } = require('express-validator')

const validateUserCreation = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .matches(/^\S+$/)
        .withMessage('Username should not contain spaces')
        .notEmpty()
        .withMessage('Username is required'),
    body('displayName')
        .isString()
        .withMessage('Display name must be a string')
        .notEmpty()
        .withMessage('Display name is required'),
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .notEmpty()
        .withMessage('Email address is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),
]

const validateUserId = [
    param('id').isMongoId().withMessage('Invalid user ID format'),
]

const validateUserUpdate = [
    body('username')
        .optional()
        .isString()
        .withMessage('Username must be a string')
        .matches(/^\S+$/)
        .withMessage('Username should not contain spaces'),
    body('displayName')
        .optional()
        .isString()
        .withMessage('Display name must be a string'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
]

const validateGetUsersQuery = [
    query('username')
        .optional()
        .isString()
        .withMessage('Username filter must be a string'),
    query('displayName')
        .optional()
        .isString()
        .withMessage('Display name filter must be a string'),
]

module.exports = {
    validateUserCreation,
    validateUserId,
    validateUserUpdate,
    validateGetUsersQuery,
}
