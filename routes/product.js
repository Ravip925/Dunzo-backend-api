const Product = require("../models/Product");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
});

// //Get all Products
router.get("/:category", async (req, res) => {
  const qCategory = req.params.category;
  try {
    let products;
    if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    }
    else {
      products = await Product.find();
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/search/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const regex = new RegExp(name, 'i'); // create a regular expression object
    const products = await Product.find({ name: regex });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
