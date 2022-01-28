const router = require('express').Router();
const {
  AuthorizeToken,
  verifyToken,
  AuthorizeAdmin,
} = require('./verifyToken');
const CryptoJS = require('crypto-js');
const Product = require('../models/Product');

// CREATE Product
router.post('/', AuthorizeAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
});

// UPDATE PRODUCT
router.put('/:id', AuthorizeAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // DELETE PRODUCT
router.delete("/:id", AuthorizeAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Le produit a été supprimé")
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category
  try {
    let products; 
    
    if(qNew){
      products = await Product.find().sort({createdAt: -1}).limit(5)
    } else if (qCategory) {
      products = await Product.find({categories: {
        $in: [qCategory]
      }})
    } else {
      products = await Product.find()
    }

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
})



module.exports = router;
