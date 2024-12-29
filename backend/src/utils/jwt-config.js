const jwt = require('jsonwebtoken')

// Generate access token (12-hour expiry)
const generateAccessToken = (user) => {
    //payload included in the token
    const payload = {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
    }

    // Signing the JWT with the secret key
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' }) //token expires in 12 hours
}

// Generate refresh token (4-day expiry)
const generateRefreshToken = (user) => {
    const payload = { id: user._id }
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '4d',
    })
}

const verifyToken = (req, res, next) => {
    // Get token from cookies or Authorization header
    const token =
        req.cookies?.userid || req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Unauthorized. No token provided.' })
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Validate decoded structure
        if (!decoded.id || !decoded.username || !decoded.displayName) {
            return res
                .status(401)
                .json({ message: 'Unauthorized. Invalid token structure.' })
        }

        // Attach user info to the request object
        req.user = decoded
        next()
    } catch (err) {
        console.error('Token verification failed:', err.message)
        return res.status(401).json({ message: 'Unauthorized. Invalid token.' })
    }
}

module.exports = { generateAccessToken, verifyToken, generateRefreshToken }
