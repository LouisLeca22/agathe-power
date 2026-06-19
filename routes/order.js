const router = require('express').Router();
const {
  AuthorizeToken,
  verifyToken,
  AuthorizeAdmin,
} = require('./verifyToken');
const CryptoJS = require('crypto-js');
const Order = require('../models/Order');

// CREATE ORDER
router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// UPDATE PRODUCT
router.put('/:id', AuthorizeAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // DELETE ORDER
router.delete('/:id', AuthorizeAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Commande supprimée');
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ORDERS FOR ONE USER
router.get('/find/:id', AuthorizeAdmin, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GER ALL ORDERS
router.get('/', AuthorizeAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET MONTHLY INCOME
router.get("/income", AuthorizeAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
