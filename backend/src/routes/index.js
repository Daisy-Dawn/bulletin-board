const express = require('express')
const usersRouter = require('./userRoutes')
const auth = require('./auth')
const posts = require('./posts')
const reactions = require('./reactions')
const commentsRouter = require('./comments')

const router = express.Router()

router.use(usersRouter)
router.use(auth)
router.use(posts)
router.use(reactions)
router.use(commentsRouter)

module.exports = router
