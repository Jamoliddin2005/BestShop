const fs = require('fs')
const path = require('path')

module.exports = (photo) => {
    if (photo) {
        fs.unlink(path.join(__dirname, '../../client/public/uploads/' + photo), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}