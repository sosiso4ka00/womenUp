const { Router } = require('express')
const { body } = require('express-validator')
const ThrowValidationError = require('../midlewares/ThrowValidationError')

const router = Router()

const Service = require("./service")

router.post(
    "/register",
    body('name').isString(),
    body('password').isString(),
    ThrowValidationError,
    Service.register
)

router.post(
    "/login",
    body('name').isString(),
    body('password').isString(),
    ThrowValidationError,
    Service.login
)


module.exports = router