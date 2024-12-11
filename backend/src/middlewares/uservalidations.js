const { body, param, query, validationResult } = require('express-validator')

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
    body('profilePicture')
        .optional()
        .isURL({ protocols: ['http', 'https'], require_protocol: true })
        .withMessage('Profile picture must be a valid URL'),
    body('location')
        .optional()
        .isString()
        .withMessage('Location must be a string')
        .default('anywhere'), // Default value if not provided,
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

//middleware to handlevalidation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next() // Proceed to the next middleware or route handler
}

module.exports = {
    validateUserCreation,
    validateUserId,
    validateUserUpdate,
    validateGetUsersQuery,
    handleValidationErrors,
}
