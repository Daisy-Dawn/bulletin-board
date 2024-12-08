const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')
const GoogleStrategy = require('passport-google-oauth20').Strategy

//LOCAL STRATEGY
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) return done(null, false, { message: 'User not found' })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return done(null, false, { message: 'Invalid Password' })
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
)

//GOOGLE STRATEGY
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async (accessToke, refreshToken, profile, done) => {
            try {
                let user = User.findOne({ googleId: profile.id })
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        username: profile.emails[0].value.split('@')[0],
                        email: profile.emails[0].value,
                    })
                }
                done(null, user)
            } catch (err) {
                done(err, null)
            }
        }
    )
)
//serialize user into session
passport.serializeUser((user, done) => done(null, user.id))

//deserialise user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = User.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

module.exports = passport
