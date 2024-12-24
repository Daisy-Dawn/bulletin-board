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
    // const token = req.headers.authorization?.startsWith('Bearer ')
    //     ? req.headers.authorization.split(' ')[1]
    //     : req.cookies?.token || req.signedCookies?.userid

    const token = req.signedCookies?.userid

    if (!token) {
        return res.redirect('/auth/login') // Redirect if no token is found
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Optionally validate the decoded structure
        if (!decoded.id || !decoded.username || !decoded.displayName) {
            return res.redirect('/auth/login') // Redirect if token structure is invalid
        }

        req.user = decoded // Attach the user payload to the request object
        next()
    } catch (err) {
        return res.redirect('/auth/login') // Redirect if token verification fails
    }
}

module.exports = { generateToken, verifyToken }
