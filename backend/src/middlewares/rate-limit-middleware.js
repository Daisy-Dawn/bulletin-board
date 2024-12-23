const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message:
        'Too many login attempts from this IP, please try again after 15 minutes',
})

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 3 registration attempts per window
    message:
        'Too many registration attempts from this IP, please try again after 15 minutes',
})

module.exports = { loginLimiter, registerLimiter }
