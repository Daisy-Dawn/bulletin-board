const handleSessionErrors = (req, res, next) => {
    if (!req.session)
        return res.status(500).json({
            error: 'Session error',
            message:
                'Session is not available. Please check session configuration.',
        })
    next()
}

const requireAuth = (req, res, next) => {
    const userSession = req.signedCookies.userSession

    if (!userSession) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'You must be logged in to access this route',
        })
    }

    // Validate user session fields
    if (!userSession.id || !userSession.username) {
        return res.status(401).json({
            error: 'Invalid session data',
            message: 'Please log in again',
        })
    }

    // Attach the user session to the request object
    req.user = userSession
    next()
}

const saveUserSessionAndCookieSetter = (req, res, next) => {
    const { user } = req

    if (!user)
        return res
            .status(500)
            .json({ error: 'User data is required to create a session' })

    // Save user data to session
    req.session.user = {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
    }

    // Set a signed cookie
    res.cookie('userSession', req.session.user, {
        httpOnly: true, // Prevent client-side JavaScript access
        secure: false, // Use true in production with HTTPS
        signed: true, // Sign the cookie
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    next()
}

module.exports = {
    handleSessionErrors,
    requireAuth,
    saveUserSessionAndCookieSetter,
}
