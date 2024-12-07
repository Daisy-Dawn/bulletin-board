const jwt = require('jsonwebtoken')

const generateJWT = (user) => {
    //payload included in the token
    const payload = {
        id: user._id,
        username: user.username,
    }

    // Signing the JWT with the secret key
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }) //token expires in a day
}

const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token)
        return res
            .status(401)
            .json({ error: 'Access denied, no token provided' })

    // Verifying the JWT using the secret
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).json({ error: 'Invalid token' })
        req.user = decoded // Store decoded user info in request object
        next()
    })
}
module.exports = {}
