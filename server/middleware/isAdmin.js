const { verifyToken } = require("../controllers/token")

module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        const verify = await verifyToken(req.headers.authorization)
        if (verify.user) {
            if (verify.user.isAdmin) {
                next()
            } else {
                return res.status(400).send({ message: "Token not found" })
            }
        } else {
            return res.status(400).send({ message: "Token not found" })
        }
    } else {
        return res.status(400).send({ message: "Token not found" })
    }
}