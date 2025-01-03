const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')
const GoogleStrategy = require('passport-google-oauth20')
const { comparePassword } = require('../utils/hashPasswords')

//LOCAL STRATEGY
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) return done(null, false, { message: 'User not found' })

            // const isMatch = await bcrypt.compare(password, user.password)
            const isMatch = await comparePassword(password, user.password)
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
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id }) // Await this query
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        username: profile.emails[0].value.split('@')[0],
                        email: profile.emails[0].value,
                        profilePicture: profile.photos?.[0]?.value || '', // Get profile picture or default to empty string
                        location: 'anywhere', // Default location
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

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)
console.log(process.env.CALLBACK_URL)

module.exports = passport
