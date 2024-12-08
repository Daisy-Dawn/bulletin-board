const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const { handleSessionErrors } = require('./src/middlewares/sessionmiddlewares')
const passport = require('./src/strategies/passportConfig')
const router = require('./src/routes/index')

dotenv.config()

const app = express()

//connect to mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully!')
    } catch (err) {
        console.error('MongoDB connection failed:', err.message)
        process.exit(1) // Exit the process if connection fails
    }
}

connectDB()

// use session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET, // Ensure this is set in your .env file
        resave: false, // Prevents the session from being saved if it is not modified
        saveUninitialized: false, // Avoid saving sessions that are not initialized
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI, // MongoDB connection string
            collectionName: 'sessions', // Session storage collection in MongoDB
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day session expiry
            httpOnly: true, // Prevents client-side JS from accessing cookies
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        },
    })
)

// Middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session())
app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(handleSessionErrors)
app.use(passport.initialize())
// app.use(passport.session())
app.use(router)

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running!')
})

//start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
})
