const fs = require('fs')
const path = require('path')

module.exports = (photo) => {
    if (photo) {
        fs.unlink(path.join(__dirname, '../../client/public/uploads/' + photo), (err) => {
            if (err) {
                return res.status(400).send("ERROR: " + err)
            }
        })
    }
}