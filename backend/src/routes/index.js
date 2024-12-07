const express = require('express')
const usersRouter = require('./userRoutes')

const router = express.Router()

router.use(usersRouter)

module.exports = router
