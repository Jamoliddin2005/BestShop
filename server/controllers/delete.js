const HeaderSwiper = require('../models/CarouselHome')
const Categories = require('../models/Categories')
const Products = require('../models/Product')
const toDelete = require("../middleware/toDelete");

exports.deleteHeaderSwiper = async (req, res) => {
    try {
        const { id } = req.params
        const { post } = await HeaderSwiper.findById(id)
        toDelete(post)
        await HeaderSwiper.findByIdAndDelete(id)
        res.status(201).json({ success: true, data: await HeaderSwiper.find() })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}
exports.deleteCategories = async (req, res) => {
    try {
        const { id } = req.params
        const { photo } = await Categories.findById(id)
        toDelete(photo)
        await Categories.findByIdAndDelete(id)
        res.status(201).json({ success: true, data: await Categories.find() })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}
exports.deleteProducts = async (req, res) => {
    try {
        const id = await req.params.id
        const { photo } = await Products.findById(id)
        toDelete(photo)
        await Products.findByIdAndDelete(id)
        return res.status(201).json({ success: true, data: await Products.find() })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}