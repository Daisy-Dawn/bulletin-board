const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    //payload included in the token
    const payload = {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
    }

    // Signing the JWT with the secret key
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }) //token expires in a day
}

const verifyToken = (req, res, next) => {
    // Get token from Authorization header or cookies
    const token = req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : req.cookies?.token

    if (!token) {
        return res.status(401).json({ error: 'Access denied, unauthorized' })
    }

    try {
        // Verify the token and attach the payload to req.user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Optionally validate decoded structure
        if (!decoded.id || !decoded.username || !decoded.displayName) {
            return res.status(401).json({ error: 'Invalid token structure' })
        }

        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

module.exports = { generateToken, verifyToken }
