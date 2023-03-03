const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

const {
  addHomeCarousel,
  show,
  addCategory,
  showCategory,
  addProduct,
  showProducts,
  categoryFind,
  productMore,
  updateProfileNumber
} = require("../controllers/Add");
const fileUpload = require("../middleware/pictureUpload");

router.post("/addCarouselHome", auth, fileUpload.single("photo"), addHomeCarousel);
router.post("/addCategory", auth, fileUpload.single("photo"), addCategory);
router.post("/addProduct", auth, fileUpload.array("photo", 20), addProduct);
router.put('/profile/updateNumber/:id', auth, updateProfileNumber)
router.get("/show", show);
router.get("/showCategory", showCategory);
router.get("/showProducts", showProducts);
router.get("/category/:id", categoryFind);
router.get("/product/more/:id", productMore);

module.exports = router;
