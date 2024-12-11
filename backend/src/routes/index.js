const express = require('express')
const usersRouter = require('./userRoutes')
const auth = require('./auth')
const posts = require('./posts')

const router = express.Router()

router.use(usersRouter)
router.use(auth)
router.use(posts)

module.exports = router
