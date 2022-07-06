const Users = require('../models/User')


exports.NumberAuth = async (req, res) => {
    try {
        const phone = new Users({
            googleId: req.body.uid,
            phoneNumber: req.body.phoneNumber
        })
        await phone.save()

        res.status(200).send("Success")
    } catch (error) {
        return res.status(400).send("ERROR: " + error)
    }
}