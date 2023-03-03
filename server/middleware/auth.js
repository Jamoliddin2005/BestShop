module.exports = async (req, res, next) => {
    const user = await req.session
    if (user.passport || user.user) {
        next()
    } else {
        return res.json('Token not defined')
    }
} 