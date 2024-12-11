const express = require('express')
const usersRouter = require('./userRoutes')
const auth = require('./auth')

const router = express.Router()

router.use(usersRouter)
router.use(auth)

module.exports = router
