const { Router } = require('express')
const { param, query, body } = require('express-validator')
const { AuthMiddleware } = require('../auth/middlewares/AuthMiddleware')
const ThrowValidationError = require('../midlewares/ThrowValidationError')

const router = Router()

const Service = require('./service')

router.get(
    "",
    AuthMiddleware,
    query('limit').optional().isInt({gt: -1}),
    query('offset').optional().isInt({ gt: -1}),
    ThrowValidationError,
    Service.get
)

router.post(
    "",
    AuthMiddleware,
    body('title').isString(),
    ThrowValidationError,
    Service.create
)

router.patch(
    "/:id",
    AuthMiddleware,
    param('id').isMongoId(),
    body('title').optional().isString(),
    body('marked').optional().isBoolean(),
    ThrowValidationError,
    Service.update
)

router.delete(
    "/:id",
    AuthMiddleware,
    param('id').isMongoId(),
    ThrowValidationError,
    Service.delete
)


module.exports = router