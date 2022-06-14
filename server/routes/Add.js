const express = require("express");
const router = express.Router();
const { addHomeCarousel, show, addCategory, showCategory, addProduct, showProducts, categoryFind, productMore } = require("../controllers/Add");
const fileUpload = require("../middleware/pictureUpload");


router.post("/addCarouselHome", fileUpload.single("photo"), addHomeCarousel);
router.post("/addCategory", fileUpload.single("photo"), addCategory);
router.post("/addProduct", fileUpload.single("photo"), addProduct)
router.get("/show", show);
router.get("/showCategory", showCategory);
router.get("/showProducts", showProducts);
router.get("/category/:id", categoryFind)
router.get('/product/more/:id', productMore)

module.exports = router;
