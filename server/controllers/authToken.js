const { verifyToken } = require("./token")

module.exports = async (req, res, next) => {
    if (req.headers) {
        const verify = await verifyToken(req.headers.authorization)
        if (verify.user) {
            return res.status(200).send({ user: verify.user, success: true })
        } else if (verify.phone) {
            return res.status(200).send({ user: verify.phone, success: true })
        }
        else {
            return res.status(400).send({ message: "Foydalanuvchi topilmadi", success: false })
        }
    } else {
        return res.status(400).send({ message: "Token topilmadi", success: false })
    }
}