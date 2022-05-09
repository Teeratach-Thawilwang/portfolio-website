const JWT = require("jsonwebtoken")

const config = process.env

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        try {
            const decoded = JWT.verify(token, config.TOKEN_KEY)
            req.user = decoded
        } catch (err) {
            return res.status(401).send({ error: "Invalid Token" })
        }
        return next();
    } else {
        return res.status(403).send({ error: "Token is required for authentication." })
    }
}

module.exports = verifyToken;