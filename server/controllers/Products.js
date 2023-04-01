const Products = require('../models/Product')

module.exports.Search = async (req, res) => {
  const { key } = req.params
  const cursor = await Products.find({ $text: { $search: key } })
  return res.status(200).send({ message: "Success", cursor })
}

exports.showProducts = async (req, res) => {
  const { page } = req.params

  await Products.find()
    .sort({ photo: -1 })
    .limit(Number(page))
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      return res.status(400).send("ERROR: " + err);
    });
};