const jwt = require("jsonwebtoken")
const secret = process.env.JWT_KEY

class Token {
    async generateToken(user) {
        return jwt.sign(user, secret, {
            expiresIn: "7d"
        })
    }

    async verifyToken(user) {
        return jwt.verify(user, secret, (err, decodedToken) => {
            if (err) {
                return err
            } else {
                return decodedToken
            }
        })
    }
}

module.exports = new Token()