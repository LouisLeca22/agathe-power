const router = require('express').Router();
const Category = require("../models/Category")

router.post("/", async (req, res ) => {
  const newCategory = await new Category(req.body)
  try {
    const savedCategory = await newCategory.save()
    res.status(200).json(savedCategory)
  } catch (error) {
    res.status(500).json(error)
  } 
})


router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const cateogry = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Category.findOneAndDelete(req.params.id)
    res.status(200).json("La catégorie a été supprimée")
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
