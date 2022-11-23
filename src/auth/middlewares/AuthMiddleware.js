const JWT = require('jsonwebtoken')
module.exports.AuthMiddleware = async (req, res, next) => {

    if(!req.headers.authorization)  return res.status(401).json({ error: "access denied" })

    const token = req.headers.authorization.split(' ')[1]

    if (!token) return res.status(401).json({ error: "access denied" })

    const tokenPayload = await checkJWT(token)
    if (!tokenPayload) return res.status(401).json({ error: "access denied" })

    req.user = {
        ...tokenPayload
    }

    next()
}


async function checkJWT(token) {
    try {
        return JWT.verify(token, process.env.JWT_SECRET)
    }
    catch {
        return false
    }
}