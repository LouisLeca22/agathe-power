const router = require('express').Router();
const {
  AuthorizeToken,
  verifyToken,
  AuthorizeAdmin,
} = require('./verifyToken');
const Cart = require('../models/Cart');

// CREATE cart
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PRODUCT
router.put('/:id', AuthorizeToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      {userId: req.params.id},
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // DELETE cart
router.delete("/:id", AuthorizeToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({userId: req.params.id})
    res.status(200).json("Le panier a été supprimé")
  } catch (error) {
    res.status(500).json(error)
  }
})

// GET USER CART
router.get("/find/:id", AuthorizeToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.id})
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all 
router.get("/", AuthorizeAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
}
)


module.exports = router;
