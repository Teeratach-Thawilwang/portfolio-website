const JWT = require("jsonwebtoken")

const config = process.env

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        try {
            const decoded = JWT.verify(token, config.TOKEN_KEY)
            req.user = decoded
        } catch (err) {
            console.log(err)
            return res.status(401).send({ error: "Invalid Token" })
        }
        return next();
    } else {
        return res.status(403).send({ error: "Token is required for authentication." })
    }
}

const createToken = async (user_id, expiretime = '7d') => {
    return JWT.sign(
        { user_id: user_id },
        process.env.TOKEN_KEY,
        {
            expiresIn: expiretime
        })
}

const checkTokenExpire = (token) => {
    try {
        const decoded = JWT.verify(token, config.TOKEN_KEY)
        if(Date.now() < decoded.exp){
            return false
        }
    } catch (err) {
        return true
    }
}

module.exports = verifyToken;
module.exports.checkTokenExpire = checkTokenExpire;
module.exports.createToken = createToken;