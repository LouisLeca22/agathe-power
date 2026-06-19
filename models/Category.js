const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  cat: {
    type: String,
    required: true,
  },
  title: {
    type: String
  },
  img: {
    type: String
  },
  
}, {timestamps: true})


module.exports = mongoose.model("Category", CategorySchema)