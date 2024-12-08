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
    const token = req.headers.authorization?.split(' ')[1]
    if (!token)
        return res.status(401).json({ error: 'Access denied, unauthorized' })

    // Verifying the JWT using the secret
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded //Attach user info to request
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}
module.exports = { generateToken, verifyToken }
