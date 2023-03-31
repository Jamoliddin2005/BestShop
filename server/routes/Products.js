const router = require('express').Router()
const { Search, showProducts } = require('../controllers/Products')

router.get('/search/:key', Search)
router.get("/showProducts/:page", showProducts);

module.exports = router