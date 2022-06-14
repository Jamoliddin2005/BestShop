const HeaderSwiper = require('../models/CarouselHome')
const Categories = require('../models/Categories')
const Products = require('../models/Product')
const toDelete = require("../middleware/toDelete");

exports.deleteHeaderSwiper = async (req, res) => {
    const { id } = req.params
    const { photo } = await HeaderSwiper.findById(id)
    toDelete(photo)
    await HeaderSwiper.findByIdAndDelete(id)
    res.status(201).json({ success: true, data: await HeaderSwiper.find() })
}

exports.deleteCategories = async (req, res) => {
    const { id } = req.params

    const { photo } = await Categories.findById(id)
    toDelete(photo)
    await Categories.findByIdAndDelete(id)
    res.status(201).json({ success: true, data: await Categories.find() })

}


exports.deleteProducts = async (req, res) => {
    const { id } = req.params

    const { photo } = await Products.findById(id)
    toDelete(photo)
    await Products.findByIdAndDelete(id)
    res.status(201).json({ success: true, data: await Products.find() })
}