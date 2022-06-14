const express = require('express')
const { deleteHeaderSwiper, deleteCategories, deleteProducts } = require('../controllers/delete')
const router = express.Router()


router.route('/headerCarousel/delete/:id')
    .delete(deleteHeaderSwiper)

router.route('/Categories/delete/:id')
    .delete(deleteCategories)

router.route('/products/delete/:id')
    .delete(deleteProducts)

module.exports = router