const Products = require('../models/Product')

module.exports.Search = async (req, res) => {
  const searchQuery = req.params.key
  console.log(searchQuery);
  // let search = await Products.find({
  //     $text: {
  //         $search: searchQuery,
  //         $caseSensitive: false,
  //         $diacriticSensitive: false
  //     },
  // })
  // return res.status(200).send({ message: "Success", search })
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