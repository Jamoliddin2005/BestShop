const mongoose = require("mongoose");
const CarouselHome = require("../models/CarouselHome");
const Categories = require("../models/Categories");
const Products = require("../models/Product");
const Profiles = require("../models/User");

exports.addHomeCarousel = async (req, res) => {
  try {
    if (req.file) {
      const carouselAdd = new CarouselHome({
        post: req.file.filename,
        link: req.body.link
      });
      await carouselAdd.save();
      const swipers = await CarouselHome.find();
      return res.status(201).json({ success: true, data: swipers });
    }
    else {
      return res.status(300).json({ success: false });
    }
  } catch (error) {
    return res.status(400).send("ERROR ADDING: " + error);
  }
};

exports.show = async (req, res) => {
  try {
    await CarouselHome.find()
      .then((result) => res.json(result))
      .catch((err) => {
        return res.status(400).send("ERROR: " + err);
      });
  } catch (error) {
    return res.status(400).send("ERROR: " + error);
  }
};
exports.addCategory = async (req, res) => {
  try {
    const categories = new Categories({
      name_uz: req.body.name_uz,
      name_ru: req.body.name_ru,
      photo: req.file.filename,
    });
    await categories.save();
    const categoriesFind = await Categories.find();
    return res.status(202).json({ success: true, data: categoriesFind });
  } catch (error) {
    return res.status(400).send("ERROR: " + error);
  }
};

exports.showCategory = async (req, res) => {
  await Categories.find()
    .then((result) => res.json(result))
    .catch((err) => {
      return res.status(400).send("ERROR: " + err);
    });
};
exports.updateProfileNumber = async (req, res) => {
  const { phoneNumber } = await req.body;
  const UpdateProfileNumber = await Profiles.findByIdAndUpdate(req.params.id, {
    phoneNumber
  })
  if (!UpdateProfileNumber) {
    return res.status(400).send({ message: "Update profile not found", status: 404 });
  }

  return res.status(201).send({ message: "Profile updated", status: 201 })
}

var Images = []

exports.addProduct = async (req, res) => {
  if (req.files) {
    imageToArray(req.files)
    const product = new Products({
      name_uz: req.body.name_uz,
      name_ru: req.body.name_ru,
      price: req.body.price,
      desc_uz: req.body.desc_uz,
      desc_ru: req.body.desc_ru,
      categoryId: req.body.categoryId,
      photo: Images,
    });
    await product.save();
    Images = []
  } else {
    const product = new Products({
      name_uz: req.body.name_uz,
      name_ru: req.body.name_ru,
      desc_uz: req.body.desc_uz,
      desc_ru: req.body.desc_ru,
      price: req.body.price,
      categoryId: req.body.categoryId,
      photo: "noimg.jpg"
    });
    await product.save();
    Images = []
  }
  const ProductFind = await Products.find();
  return res.status(202).json({ success: true, data: ProductFind });
};

exports.categoryFind = async (req, res) => {
  const categoryFind = await Products.aggregate([
    {
      $match: {
        categoryId: mongoose.Types.ObjectId(req.params.id),
      },
    },
  ]);
  return res.status(201).json({ success: true, data: categoryFind });
};

exports.productMore = async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  return res.status(201).json({ success: true, data: product });
};

function imageToArray(images) {
  for (var i = 0; i < images.length; i++) {
    Images.push(images[i].filename)
  }
  return
}