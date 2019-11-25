const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const api = middleware.api
const controller = require('../controller/task')

router.post('/load', api(controller.load))

module.exports = router
